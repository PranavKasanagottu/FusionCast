'use client';

import { useState } from 'react';
import { Upload, FileText, X, Check, AlertCircle } from 'lucide-react';

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);

  // Handle file selection
  const handleFileChange = (selectedFile) => {
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile);
      setUploadStatus(null);
      parseCSVPreview(selectedFile);
    } else {
      setUploadStatus({ type: 'error', message: 'Please upload a valid CSV file' });
    }
  };

  // Parse CSV for preview
  const parseCSVPreview = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const lines = text.split('\n').slice(0, 6);
      const rows = lines.map(line => line.split(','));
      setPreview(rows);
    };
    reader.readAsText(file);
  };

  // Handle drag events
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    handleFileChange(droppedFile);
  };

  // Handle file input change
  const handleInputChange = (e) => {
    const selectedFile = e.target.files[0];
    handleFileChange(selectedFile);
  };

  // Handle submit
  const handleSubmit = async () => {
    if (!file) {
      setUploadStatus({ type: 'error', message: 'Please select a file first' });
      return;
    }

    setIsUploading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsUploading(false);
      setUploadStatus({ type: 'success', message: 'File uploaded successfully!' });
    }, 2000);
  };

  // Clear file
  const clearFile = () => {
    setFile(null);
    setPreview(null);
    setUploadStatus(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
          <Upload className="h-7 w-7 mr-3 text-blue-600" />
          Upload Time-Series Dataset
        </h2>

        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
            isDragging
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50'
          }`}
        >
          <input
            type="file"
            accept=".csv"
            onChange={handleInputChange}
            className="hidden"
            id="file-upload"
          />
          
          {!file ? (
            <div>
              <Upload className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 mb-2 text-lg">
                Drag and drop your CSV file here, or
              </p>
              <label
                htmlFor="file-upload"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 font-medium"
              >
                Browse Files
              </label>
              <p className="text-sm text-gray-500 mt-4">
                Supported format: CSV (up to 10MB)
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-between bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center space-x-3">
                <FileText className="h-10 w-10 text-blue-600" />
                <div className="text-left">
                  <p className="text-gray-800 font-medium text-lg">{file.name}</p>
                  <p className="text-sm text-gray-500">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>
              <button
                onClick={clearFile}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          )}
        </div>

        {preview && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Data Preview (First 5 Rows)
            </h3>
            <div className="overflow-x-auto bg-gray-50 rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    {preview[0]?.map((header, idx) => (
                      <th
                        key={idx}
                        className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {preview.slice(1).map((row, rowIdx) => (
                    <tr key={rowIdx} className="hover:bg-gray-50 transition-colors">
                      {row.map((cell, cellIdx) => (
                        <td
                          key={cellIdx}
                          className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap"
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {uploadStatus && (
          <div
            className={`mt-4 p-4 rounded-lg flex items-center space-x-3 ${
              uploadStatus.type === 'success'
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            {uploadStatus.type === 'success' ? (
              <Check className="h-5 w-5" />
            ) : (
              <AlertCircle className="h-5 w-5" />
            )}
            <span className="font-medium">{uploadStatus.message}</span>
          </div>
        )}

        <div className="mt-6">
          <button
            onClick={handleSubmit}
            disabled={!file || isUploading}
            className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-300 transform ${
              file && !isUploading
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isUploading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-3"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Uploading...
              </span>
            ) : (
              'Submit for Forecasting'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}