'use client';

import { useState } from 'react';
import { Upload, FileText, X, Check, AlertCircle } from 'lucide-react';
import styles from './Upload.module.css'; // Import the CSS module

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
    <div className={styles.uploadContainer}>
      <div className={styles.uploadCard}>
        <h2 className={styles.mainHeading}>
          <Upload className={styles.mainIcon} />
          Upload Time-Series Dataset
        </h2>

        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          // Dynamic class selection based on state
          className={`${styles.dropZone} ${
            isDragging
              ? styles.dropZoneActive
              : styles.dropZoneInactive
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
              <Upload className={styles.uploadIcon} />
              <p className={styles.dragText}>
                Drag and drop your CSV file here, or
              </p>
              <label
                htmlFor="file-upload"
                className={styles.browseButton}
              >
                Browse Files
              </label>
              <p className={styles.hintText}>
                Supported format: CSV (up to 10MB)
              </p>
            </div>
          ) : (
            <div className={styles.fileDisplay}>
              <div className={styles.fileDetails}>
                <FileText className={styles.fileIcon} />
                <div className={styles.fileDetailsText}>
                  <p className={styles.fileName}>{file.name}</p>
                  <p className={styles.fileSize}>
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>
              <button
                onClick={clearFile}
                className={styles.removeButton}
              >
                <X className={styles.removeIcon} />
              </button>
            </div>
          )}
        </div>

        {preview && (
          <div className={styles.previewSection}>
            <h3 className={styles.previewHeading}>
              Data Preview (First 5 Rows)
            </h3>
            <div className={styles.tableWrapper}>
              <table className={styles.dataTable}>
                <thead>
                  <tr>
                    {preview[0]?.map((header, idx) => (
                      <th
                        key={idx}
                        className={styles.dataTableTh}
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {preview.slice(1).map((row, rowIdx) => (
                    <tr key={rowIdx}>
                      {row.map((cell, cellIdx) => (
                        <td
                          key={cellIdx}
                          className={styles.dataTableTd}
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
            className={`${styles.statusMessage} ${
              uploadStatus.type === 'success'
                ? styles.statusSuccess
                : styles.statusError
            }`}
          >
            {uploadStatus.type === 'success' ? (
              <Check className={styles.statusIcon} />
            ) : (
              <AlertCircle className={styles.statusIcon} />
            )}
            <span className={styles.statusText}>{uploadStatus.message}</span>
          </div>
        )}

        <div className={styles.submitButtonContainer}>
          <button
            onClick={handleSubmit}
            disabled={!file || isUploading}
            className={`${styles.submitButton} ${
              file && !isUploading
                ? styles.submitButtonActive
                : styles.submitButtonDisabled
            }`}
          >
            {isUploading ? (
              <span className="flex items-center justify-center">
                {/* Note: Tailwind's built-in `animate-spin` class is often easier than managing complex CSS keyframes */}
                <svg
                  className={styles.loadingSpinner}
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