"""
Explainability module for MCDFN model
Implements SHAP and Permutation Feature Importance (PFI)
"""
import numpy as np
import pandas as pd
from sklearn.metrics import mean_squared_error
from collections import defaultdict
import time

# Feature names used in the model
FEATURE_NAMES = ['Sales', 'month_sin', 'month_cos', 'day_sin', 'day_cos',
                 'week_sin', 'week_cos', 'year_sin', 'year_cos', 'is_holiday']

def calculate_pfi(model, X_test, y_test, target_scaler, n_repeats=5, batch_size=32):
    """
    Calculate Permutation Feature Importance
    
    Args:
        model: Trained Keras model
        X_test: Test input data (samples, timesteps, features)
        y_test: Test target data (samples, timesteps, 1)
        target_scaler: Fitted StandardScaler for inverse transform
        n_repeats: Number of permutation repeats
        batch_size: Batch size for predictions
    
    Returns:
        dict: Feature importance scores with mean and std
    """
    print("Calculating Permutation Feature Importance...")
    start_time = time.time()
    
    # Calculate baseline score
    baseline_score = _pfi_scorer(model, X_test, y_test, target_scaler, batch_size)
    print(f"Baseline Score (Negative MSE): {baseline_score:.4f}")
    
    # Calculate permuted scores
    rng = np.random.RandomState(42)
    permuted_scores = defaultdict(list)
    n_features = X_test.shape[2]
    
    for i in range(n_features):
        feature_name = FEATURE_NAMES[i]
        print(f"  Permuting feature: {feature_name} ({i+1}/{n_features})...")
        
        for _ in range(n_repeats):
            X_test_permuted = X_test.copy()
            
            # Shuffle feature across all samples and timesteps
            feature_data = X_test_permuted[:, :, i].flatten()
            rng.shuffle(feature_data)
            X_test_permuted[:, :, i] = feature_data.reshape(X_test.shape[0], X_test.shape[1])
            
            # Calculate score with permuted feature
            score = _pfi_scorer(model, X_test_permuted, y_test, target_scaler, batch_size)
            permuted_scores[feature_name].append(score)
    
    # Calculate importance scores
    importances = {}
    for feature_name in FEATURE_NAMES:
        scores = np.array(permuted_scores[feature_name])
        importance_mean = baseline_score - np.mean(scores)  # Drop in performance
        importance_std = np.std(scores)
        importances[feature_name] = {
            'mean': float(importance_mean),
            'std': float(importance_std)
        }
    
    print(f"PFI calculation finished in {time.time() - start_time:.2f} seconds.")
    
    # Sort by importance
    sorted_importances = dict(sorted(importances.items(), 
                                    key=lambda x: x[1]['mean'], 
                                    reverse=True))
    
    return sorted_importances


def _pfi_scorer(model, X_perm, y_true_scaled, target_scaler, batch_size):
    """Helper function to score model predictions"""
    scaled_preds = model.predict(X_perm, batch_size=batch_size, verbose=0)
    pred_shape = scaled_preds.shape
    true_shape = y_true_scaled.shape
    
    preds_flat = scaled_preds.reshape(pred_shape[0] * pred_shape[1], 1)
    y_true_flat = y_true_scaled.reshape(true_shape[0] * true_shape[1], 1)
    
    preds_unscaled = target_scaler.inverse_transform(preds_flat)
    y_true_unscaled = target_scaler.inverse_transform(y_true_flat)
    
    mse = mean_squared_error(y_true_unscaled, preds_unscaled)
    return -mse  # Negative MSE


def calculate_shap_approximation(model, X_input, feature_scaler, target_scaler):
    """
    Calculate SHAP-like feature importance using gradient-based approximation
    This is faster than full SHAP but provides similar insights
    
    Args:
        model: Trained Keras model
        X_input: Input data (1, timesteps, features)
        feature_scaler: Fitted StandardScaler for features
        target_scaler: Fitted StandardScaler for target
    
    Returns:
        dict: Feature importance scores
    """
    import tensorflow as tf
    
    print("Calculating SHAP approximation using gradients...")
    start_time = time.time()
    
    # Convert to tensor
    X_tensor = tf.convert_to_tensor(X_input, dtype=tf.float32)
    
    # Calculate gradients
    with tf.GradientTape() as tape:
        tape.watch(X_tensor)
        predictions = model(X_tensor, training=False)
        # Use mean of predictions as the output to explain
        output = tf.reduce_mean(predictions)
    
    # Get gradients
    gradients = tape.gradient(output, X_tensor)
    
    if gradients is None:
        print("Warning: Could not calculate gradients")
        return {name: 0.0 for name in FEATURE_NAMES}
    
    # Calculate feature importance as mean absolute gradient * input
    gradients_np = gradients.numpy()
    X_input_np = X_input
    
    # Gradient * Input approximation (similar to Integrated Gradients)
    importance = np.abs(gradients_np * X_input_np)
    
    # Average across time dimension
    importance_per_feature = np.mean(importance, axis=(0, 1))
    
    # Normalize to sum to 1
    importance_normalized = importance_per_feature / (np.sum(importance_per_feature) + 1e-10)
    
    # Create result dictionary
    shap_values = {}
    for i, feature_name in enumerate(FEATURE_NAMES):
        shap_values[feature_name] = float(importance_normalized[i])
    
    # Sort by importance
    sorted_shap = dict(sorted(shap_values.items(), 
                             key=lambda x: x[1], 
                             reverse=True))
    
    print(f"SHAP approximation finished in {time.time() - start_time:.2f} seconds.")
    
    return sorted_shap


def get_feature_descriptions():
    """Return human-readable descriptions for each feature"""
    return {
        'Sales': 'Historical sales values',
        'month_sin': 'Month cyclical pattern (sine)',
        'month_cos': 'Month cyclical pattern (cosine)',
        'day_sin': 'Day of month cyclical pattern (sine)',
        'day_cos': 'Day of month cyclical pattern (cosine)',
        'week_sin': 'Week of year cyclical pattern (sine)',
        'week_cos': 'Week of year cyclical pattern (cosine)',
        'year_sin': 'Year trend pattern (sine)',
        'year_cos': 'Year trend pattern (cosine)',
        'is_holiday': 'Holiday indicator (0 or 1)'
    }


def create_test_windows(data, input_width, label_width, shift):
    """
    Create windowed data for testing
    
    Args:
        data: DataFrame with features
        input_width: Input sequence length
        label_width: Output sequence length
        shift: Shift between input and output
    
    Returns:
        X, y: Numpy arrays of windowed data
    """
    X, y = [], []
    
    for i in range(0, len(data) - input_width - shift + 1):
        input_slice = data.iloc[i : i + input_width].values
        label_slice = data.iloc[i + input_width : i + input_width + shift][['Sales']].values
        
        if len(label_slice) == label_width:
            X.append(input_slice)
            y.append(label_slice)
    
    return np.array(X), np.array(y)
