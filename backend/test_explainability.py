"""
Test script for explainability module
Run this to verify SHAP approximation works correctly
"""
import numpy as np
import tensorflow as tf
from api.explainability import calculate_shap_approximation, get_feature_descriptions

def test_explainability():
    """Test the explainability module with dummy data"""
    print("=" * 60)
    print("Testing Explainability Module")
    print("=" * 60)
    
    # Load the model
    print("\n1. Loading model...")
    try:
        model = tf.keras.models.load_model('mcdfn_model.keras')
        print("✓ Model loaded successfully")
    except Exception as e:
        print(f"✗ Failed to load model: {e}")
        return False
    
    # Create dummy input data (1, 30, 10)
    print("\n2. Creating dummy input data...")
    np.random.seed(42)
    X_input = np.random.randn(1, 30, 10).astype(np.float32)
    print(f"✓ Input shape: {X_input.shape}")
    
    # Create dummy scalers (not used in gradient calculation but needed for API)
    from sklearn.preprocessing import StandardScaler
    feature_scaler = StandardScaler()
    target_scaler = StandardScaler()
    
    # Fit with dummy data
    feature_scaler.fit(np.random.randn(100, 9))
    target_scaler.fit(np.random.randn(100, 1))
    
    # Test SHAP approximation
    print("\n3. Calculating SHAP approximation...")
    try:
        shap_values = calculate_shap_approximation(
            model, 
            X_input, 
            feature_scaler, 
            target_scaler
        )
        print("✓ SHAP calculation successful")
        
        # Verify results
        print("\n4. Verifying results...")
        
        # Check if we have all features
        expected_features = ['Sales', 'month_sin', 'month_cos', 'day_sin', 'day_cos',
                           'week_sin', 'week_cos', 'year_sin', 'year_cos', 'is_holiday']
        
        if set(shap_values.keys()) == set(expected_features):
            print("✓ All features present")
        else:
            print("✗ Missing features")
            return False
        
        # Check if values sum to approximately 1
        total = sum(shap_values.values())
        if 0.99 <= total <= 1.01:
            print(f"✓ Values normalized correctly (sum={total:.4f})")
        else:
            print(f"✗ Values not normalized (sum={total:.4f})")
            return False
        
        # Display results
        print("\n5. Feature Importance Rankings:")
        print("-" * 60)
        for i, (feature, importance) in enumerate(shap_values.items(), 1):
            percentage = importance * 100
            bar = "█" * int(percentage / 2)
            print(f"{i:2d}. {feature:12s} | {bar:20s} {percentage:5.1f}%")
        
        # Test feature descriptions
        print("\n6. Testing feature descriptions...")
        descriptions = get_feature_descriptions()
        if len(descriptions) == len(expected_features):
            print("✓ All feature descriptions available")
        else:
            print("✗ Missing feature descriptions")
            return False
        
        print("\n" + "=" * 60)
        print("✓ All tests passed!")
        print("=" * 60)
        return True
        
    except Exception as e:
        print(f"✗ SHAP calculation failed: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    import os
    import sys
    
    # Add parent directory to path
    sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
    
    # Run test
    success = test_explainability()
    
    if success:
        print("\n✓ Explainability module is working correctly!")
        sys.exit(0)
    else:
        print("\n✗ Explainability module has issues. Please check the errors above.")
        sys.exit(1)
