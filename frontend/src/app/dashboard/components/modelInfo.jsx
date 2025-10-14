'use client';

import { Database, Brain, TrendingUp, Zap, Check } from 'lucide-react';

export default function ModelInfo() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
          <Database className="h-7 w-7 mr-3 text-blue-600" />
          MCDFN Model Information
        </h2>

        {/* Architecture Overview */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Architecture Overview</h3>
          <p className="text-gray-700 leading-relaxed">
            The Multi-Channel Deep Fusion Network (MCDFN) combines three parallel deep learning architectures - Convolutional Neural Networks (CNN), Long Short-Term Memory (LSTM), and Gated Recurrent Units (GRU) - to capture diverse temporal patterns in time-series data for superior forecasting accuracy.
          </p>
        </div>

        {/* Three Channel Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white border-2 border-blue-200 rounded-lg p-5 text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <Brain className="h-12 w-12 mx-auto text-blue-600 mb-3" />
            <h4 className="font-semibold text-gray-800 mb-2 text-lg">CNN Channel</h4>
            <p className="text-sm text-gray-600">Extracts spatial features and local patterns from time-series data</p>
          </div>
          <div className="bg-white border-2 border-purple-200 rounded-lg p-5 text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <TrendingUp className="h-12 w-12 mx-auto text-purple-600 mb-3" />
            <h4 className="font-semibold text-gray-800 mb-2 text-lg">LSTM Channel</h4>
            <p className="text-sm text-gray-600">Captures long-term dependencies and temporal relationships</p>
          </div>
          <div className="bg-white border-2 border-green-200 rounded-lg p-5 text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <Zap className="h-12 w-12 mx-auto text-green-600 mb-3" />
            <h4 className="font-semibold text-gray-800 mb-2 text-lg">GRU Channel</h4>
            <p className="text-sm text-gray-600">Efficient temporal modeling with reduced computational complexity</p>
          </div>
        </div>

        {/* Model Specifications */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Model Specifications</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <span className="text-gray-700 font-medium">Architecture Type</span>
              <span className="text-gray-800 font-semibold">Hybrid Deep Learning</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <span className="text-gray-700 font-medium">Input Format</span>
              <span className="text-gray-800 font-semibold">Time-Series CSV</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <span className="text-gray-700 font-medium">Channels</span>
              <span className="text-gray-800 font-semibold">CNN + LSTM + GRU</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <span className="text-gray-700 font-medium">Fusion Strategy</span>
              <span className="text-gray-800 font-semibold">Concatenation + Dense Layers</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <span className="text-gray-700 font-medium">Explainability Methods</span>
              <span className="text-gray-800 font-semibold">ShapTime + PFI</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <span className="text-gray-700 font-medium">Training Dataset Size</span>
              <span className="text-gray-800 font-semibold">50,000+ samples</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <span className="text-gray-700 font-medium">Model Version</span>
              <span className="text-gray-800 font-semibold">v2.1.0</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg border border-green-200">
              <span className="text-gray-700 font-medium">Model Status</span>
              <span className="text-green-600 font-semibold flex items-center">
                <span className="h-2 w-2 bg-green-600 rounded-full mr-2 animate-pulse"></span>
                Active & Ready
              </span>
            </div>
          </div>
        </div>

        {/* Explainable AI Features */}
        <div className="bg-blue-50 rounded-lg p-6 border border-blue-200 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
            <Zap className="h-6 w-6 mr-2 text-blue-600" />
            Explainable AI Features
          </h3>
          <p className="text-gray-700 mb-4">
            Our model incorporates advanced explainability techniques to help you understand which features drive predictions:
          </p>
          <ul className="space-y-3">
            <li className="flex items-start">
              <Check className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-gray-800 font-semibold">ShapTime:</span>
                <span className="text-gray-700"> Time-series specific SHAP values that provide feature importance scores at each timestep, helping identify which features contribute most to predictions.</span>
              </div>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-gray-800 font-semibold">Permutation Feature Importance:</span>
                <span className="text-gray-700"> Measures the impact of each feature on model performance by randomly shuffling feature values and observing prediction changes.</span>
              </div>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-gray-800 font-semibold">Attention Visualization:</span>
                <span className="text-gray-700"> Visual representation of which time steps the model focuses on when making predictions, enhancing interpretability.</span>
              </div>
            </li>
          </ul>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Performance Metrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-blue-600">95.8%</p>
              <p className="text-sm text-gray-600 mt-1">Average Accuracy</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-purple-600">0.018</p>
              <p className="text-sm text-gray-600 mt-1">Mean Squared Error</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-green-600">0.134</p>
              <p className="text-sm text-gray-600 mt-1">Mean Absolute Error</p>
            </div>
          </div>
        </div>

        {/* Technical Details */}
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Technical Details</h3>
          <div className="space-y-2 text-sm text-gray-700">
            <p><span className="font-semibold">Framework:</span> TensorFlow 2.x / PyTorch</p>
            <p><span className="font-semibold">Optimizer:</span> Adam with learning rate scheduling</p>
            <p><span className="font-semibold">Loss Function:</span> Mean Squared Error (MSE)</p>
            <p><span className="font-semibold">Regularization:</span> Dropout (0.2) + L2 Regularization</p>
            <p><span className="font-semibold">Training Time:</span> ~3-4 hours on GPU</p>
            <p><span className="font-semibold">Inference Time:</span> ~50ms per prediction</p>
          </div>
        </div>
      </div>
    </div>
  );
}