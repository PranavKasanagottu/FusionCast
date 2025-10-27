from django.shortcuts import render

# Create your views here.
# from django.http import JsonResponse
# from django.views.decorators.csrf import csrf_exempt
# from django.views.decorators.http import require_POST
# import pandas as pd
# import tensorflow as tf
# import os

# @csrf_exempt  # Disable CSRF for simplicity (use tokens in production)
# @require_POST
# def upload_csv(request):
#     if 'file' not in request.FILES:
#         return JsonResponse({'error': 'No file provided'}, status=400)
    
#     csv_file = request.FILES['file']
    
#     try:
#         # Read CSV in memory
#         df = pd.read_csv(csv_file)
        
#         # Load the model (assuming it's in the same directory)
#         model_path = os.path.join(os.path.dirname(__file__), 'my_llm_model.keras')
#         model = tf.keras.models.load_model(model_path)
        
#         # Placeholder: Preprocess data and run inference
#         # Customize this! E.g., assume CSV has a 'text' column, and model predicts on it.
#         # Preprocess: Convert to numpy array or tokenize if needed.
#         inputs = df['text'].values  # Example: Replace 'text' with your column name
#         # If your LLM needs tokenization, add it here (e.g., using tokenizer from training).
        
#         predictions = model.predict(inputs)  # Run inference
        
#         # Process predictions (e.g., convert to list for JSON)
#         results = predictions.tolist()  # Or format as needed
        
#         return JsonResponse({'status': 'success', 'results': results})
    
#     except Exception as e:
#         return JsonResponse({'error': str(e)}, status=500)

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST

@csrf_exempt  # Disable CSRF for simplicity (use tokens in production)
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