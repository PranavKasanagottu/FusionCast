# Testing Instructions for MCDFN Integration

## Prerequisites

1. Ensure Python 3.10+ is installed
2. Ensure Node.js and npm are installed
3. Ensure the virtual environment is activated (if using one)

## Setup

### 1. Backend Setup

```bash
cd backend

# Install dependencies (if not already installed)
pip install -r requirements.txt

# Verify the model file exists
# You should see: mcdfn_model.keras in the backend directory

# Start the Django server
python manage.py runserver
```

The backend should start on `http://127.0.0.1:8000`

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies (if not already installed)
npm install

# Start the development server
npm run dev
```

The frontend should start on `http://localhost:3000`

## Testing the Integration

### Step 1: Access the Application

1. Open browser and go to `http://localhost:3000`
2. Login with your credentials (or register if needed)

### Step 2: Upload Data

1. Navigate to the Dashboard
2. Click on "Upload Data" in the navigation
3. Click "Browse Files" or drag and drop the sample CSV file
4. The CSV should have format:
   ```csv
   date,sales
   2015-01-01,45
   2015-01-02,52
   ...
   ```

   **Note**: A sample file `sample_data.csv` has been created at the root of the project

5. You'll see a preview of the first 5 rows
6. Click "Submit for Forecasting"

### Step 3: View Results

1. After submission, you'll be redirected to the Results page
2. The page displays:
   - **Metrics Cards**:
     - Average Forecast
     - Peak Forecast
     - Min Forecast
     - Trend (positive/negative percentage)
   
   - **Visual Chart**: 
     - Historical data (blue bars)
     - Forecast data (green bars)
   
   - **Detailed Forecast Table**:
     - Shows all 30 days of forecast
     - Date and predicted sales value for each day

### Step 4: Navigation

1. Click "Back to Dashboard" to return to the main dashboard
2. Use the navigation menu to access other sections

## CSV Format Requirements

### Required Columns

1. **Date Column** (case-insensitive): `date`, `Date`, `timestamp`, `time`, etc.
2. **Sales Column** (case-insensitive): `sales`, `Sales`

### Example CSV

```csv
date,sales
2023-01-01,100
2023-01-02,120
2023-01-03,110
...
```

### Date Formats Supported

- YYYY-MM-DD (2023-01-01)
- MM/DD/YYYY (01/01/2023)
- DD-MM-YYYY (01-01-2023)
- Any format parseable by pandas

## Common Issues and Solutions

### Issue 1: Model Not Found
**Error**: `FileNotFoundError: mcdfn_model.keras`

**Solution**: 
- Ensure `mcdfn_model.keras` exists in the `backend/` directory
- If missing, run the training notebook `MCDFN.ipynb` to generate the model

### Issue 2: CORS Error
**Error**: `CORS policy` error in browser console

**Solution**:
- Check `backend/backend/settings.py` has `CORS_ALLOW_ALL_ORIGINS = True`
- Restart the Django server

### Issue 3: Not Enough Data
**Error**: "Need at least 30 days of historical data"

**Solution**:
- Ensure your CSV has at least 30 rows
- Check that dates are in chronological order

### Issue 4: Date Parsing Error
**Error**: "Unable to parse date"

**Solution**:
- Ensure date column is named correctly (date, Date, timestamp, etc.)
- Check date format is valid
- Try using format: YYYY-MM-DD

### Issue 5: Import Errors
**Error**: Module not found (holidays, sklearn, etc.)

**Solution**:
```bash
cd backend
pip install -r requirements.txt
```

## Expected Results

After uploading a CSV file, you should see:

1. **Success Message**: "Forecast generated successfully!"
2. **Redirect**: Automatically redirected to results page after 1.5 seconds
3. **Results Display**:
   - 4 metric cards with key statistics
   - Interactive bar chart showing historical vs forecast
   - Table with 30-day forecast values

## Model Performance

The MCDFN model shows:
- **Test RMSE**: ~5.85
- **Test MAE**: ~4.59
- **Test MAPE**: ~22.58%

*Note: Performance may vary based on your data characteristics*

## Testing with Different Data

### 1. Time Series with Trend
- Upload data showing clear upward or downward trend
- Verify forecast continues the trend

### 2. Seasonal Data
- Upload data with seasonal patterns
- Verify forecast captures seasonality

### 3. Random Data
- Upload random sales data
- Verify forecast provides reasonable predictions

## API Testing (Optional)

You can test the API directly using curl:

```bash
curl -X POST http://127.0.0.1:8000/api/predict/ \
  -F "file=@sample_data.csv"
```

Response should be JSON with:
- `historical`: dates and sales values
- `forecast`: 30-day forecast
- `metrics`: statistical metrics

## Next Steps

After successful testing:
1. Try with your own real sales data
2. Analyze forecast patterns
3. Compare with actual sales (if available)
4. Iterate and improve model if needed

## Troubleshooting

If you encounter any issues:

1. Check browser console for JavaScript errors
2. Check Django terminal for Python errors
3. Verify all files are in correct locations
4. Ensure all dependencies are installed
5. Restart both servers

For detailed implementation, see `IMPLEMENTATION_SUMMARY.md`
