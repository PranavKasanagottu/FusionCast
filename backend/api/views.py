from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
import pandas as pd
import numpy as np
import tensorflow as tf
import holidays
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import mean_squared_error, mean_absolute_error, mean_absolute_percentage_error
import os
import json

# Load model at module level (only once)
MODEL_PATH = os.path.join(os.path.dirname(__file__), '..', 'mcdfn_model.keras')
model = None

def get_model():
    global model
    if model is None:
        model = tf.keras.models.load_model(MODEL_PATH)
    return model

@csrf_exempt
@require_POST
def predict_forecast(request):
    if 'file' not in request.FILES:
        return JsonResponse({'error': 'No file provided'}, status=400)
    
    csv_file = request.FILES['file']
    
    try:
        # Read and process the CSV file
        # Try to handle different date column names
        df = pd.read_csv(csv_file)
        
        # Look for date column (case-insensitive)
        date_col = None
        for col in df.columns:
            if col.lower() in ['date', 'timestamp', 'time']:
                date_col = col
                break
        
        if date_col is None:
            return JsonResponse({'error': 'CSV must contain a date column (date, timestamp, or time)'}, status=400)
        
        # Rename to 'date' for consistency
        if date_col != 'date':
            df.rename(columns={date_col: 'date'}, inplace=True)
        
        # Parse dates
        df['date'] = pd.to_datetime(df['date'])
        
        # Sort by date to ensure chronological order
        df = df.sort_values('date')
        
        # Validate required columns
        if 'sales' not in df.columns and 'Sales' not in df.columns:
            return JsonResponse({'error': 'CSV must contain a "sales" column'}, status=400)
        
        # Handle case-insensitive column names
        if 'Sales' in df.columns and 'sales' not in df.columns:
            df.rename(columns={'Sales': 'sales'}, inplace=True)
        
        # Select and rename columns
        df = df[['date', 'sales']]
        df.rename(columns={'date': 'Date', 'sales': 'Sales'}, inplace=True)
        df.set_index('Date', inplace=True)
        
        # Check if we have at least 30 days of data
        if len(df) < 30:
            return JsonResponse({'error': 'Need at least 30 days of historical data'}, status=400)
        
        # Get the last 30 days for prediction
        input_data = df.tail(30).copy()
        
        # Feature engineering (same as training)
        # Get year range from data
        year_range = range(input_data.index.year.min() - 1, input_data.index.year.max() + 2)
        bd_holidays = holidays.Bangladesh(years=year_range)
        input_data['is_holiday'] = input_data.index.isin(bd_holidays).astype(int)
        input_data['month'] = input_data.index.month
        input_data['day_of_month'] = input_data.index.day
        input_data['week_of_year'] = input_data.index.isocalendar().week
        input_data['year'] = input_data.index.year
        
        # Cyclic transformations
        input_data['month_sin'] = np.sin(2 * np.pi * input_data['month'] / 12)
        input_data['month_cos'] = np.cos(2 * np.pi * input_data['month'] / 12)
        input_data['day_sin'] = np.sin(2 * np.pi * input_data['day_of_month'] / 31)
        input_data['day_cos'] = np.cos(2 * np.pi * input_data['day_of_month'] / 31)
        input_data['week_sin'] = np.sin(2 * np.pi * input_data['week_of_year'] / 52)
        input_data['week_cos'] = np.cos(2 * np.pi * input_data['week_of_year'] / 52)
        input_data['year_sin'] = np.sin(2 * np.pi * (input_data['year'] - input_data['year'].min()) / (input_data['year'].max() - input_data['year'].min() + 1))
        input_data['year_cos'] = np.cos(2 * np.pi * (input_data['year'] - input_data['year'].min()) / (input_data['year'].max() - input_data['year'].min() + 1))
        
        # Select features
        features = input_data[['Sales', 'month_sin', 'month_cos', 'day_sin', 'day_cos',
                               'week_sin', 'week_cos', 'year_sin', 'year_cos', 'is_holiday']]
        
        # Load scalers (we'll need to recreate them based on training logic)
        # For simplicity, we'll use the same approach as in the notebook
        target_feature = 'Sales'
        other_features = [col for col in features.columns if col not in [target_feature, 'is_holiday']]
        
        # Create scalers and fit on the input data
        target_scaler = StandardScaler()
        feature_scaler = StandardScaler()
        
        # Fit scalers on the input data (simple approach)
        features_scaled = features.copy()
        features_scaled[[target_feature]] = target_scaler.fit_transform(features[[target_feature]])
        features_scaled[other_features] = feature_scaler.fit_transform(features[other_features])
        
        # Prepare input for model: (1, 30, 10)
        model_input = np.array(features_scaled).reshape(1, 30, 10)
        
        # Get predictions
        mcdfn_model = get_model()
        scaled_predictions = mcdfn_model.predict(model_input, verbose=0)
        
        # Inverse transform predictions
        predictions_flat = scaled_predictions.reshape(30, 1)
        forecast = target_scaler.inverse_transform(predictions_flat)
        
        # Calculate forecast dates
        last_date = df.index[-1]
        forecast_dates = pd.date_range(start=last_date + pd.Timedelta(days=1), periods=30, freq='D')
        
        # Prepare results
        historical_dates = df.index.tolist()
        historical_sales = df['Sales'].tolist()
        forecast_dates_str = [d.strftime('%Y-%m-%d') for d in forecast_dates]
        forecast_values = forecast.flatten().tolist()
        
        # Calculate some metrics (using last 30 days of actual as reference)
        if len(historical_sales) >= 30:
            actual_last_30 = historical_sales[-30:]
            avg_actual = np.mean(actual_last_30)
            avg_forecast = np.mean(forecast_values)
            forecast_change = ((avg_forecast - avg_actual) / avg_actual * 100) if avg_actual > 0 else 0
        else:
            forecast_change = 0
        
        return JsonResponse({
            'status': 'success',
            'historical': {
                'dates': [d.strftime('%Y-%m-%d') for d in historical_dates],
                'sales': historical_sales
            },
            'forecast': {
                'dates': forecast_dates_str,
                'sales': forecast_values
            },
            'metrics': {
                'forecast_change_percent': round(forecast_change, 2),
                'average_historical': round(np.mean(historical_sales), 2),
                'average_forecast': round(np.mean(forecast_values), 2),
                'max_forecast': round(np.max(forecast_values), 2),
                'min_forecast': round(np.min(forecast_values), 2)
            }
        })
        
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


@csrf_exempt
@require_POST
def upload_csv(request):
    if 'file' not in request.FILES:
        return JsonResponse({'error': 'No file provided'}, status=400)
    
    csv_file = request.FILES['file']
    
    try:
        # For testing, just confirm the file is received
        file_name = csv_file.name
        file_size = csv_file.size  # Size in bytes
        return JsonResponse({
            'status': 'success',
            'message': f'File received: {file_name}, Size: {file_size} bytes'
        })
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
