'use client';

import { Database, Brain, TrendingUp, Zap, Check } from 'lucide-react';
import styles from './ModelInfo.module.css'; // Import the CSS module

export default function ModelInfo() {
  return (
    <div className={styles.container}>
      <div className={styles.infoCard}>
        {/* Main Heading */}
        <h2 className={styles.mainHeading}>
          <Database className={styles.mainIcon} />
          MCDFN Model Information
        </h2>

        {/* Architecture Overview */}
        <div className={styles.architectureOverview}>
          <h3 className={styles.subHeading}>Architecture Overview</h3>
          <p className={styles.bodyText}>
            The Multi-Channel Deep Fusion Network (MCDFN) combines three parallel deep learning architectures - Convolutional Neural Networks (CNN), Long Short-Term Memory (LSTM), and Gated Recurrent Units (GRU) - to capture diverse temporal patterns in time-series data for superior forecasting accuracy.
          </p>
        </div>

        {/* Three Channel Cards */}
        <div className={styles.channelCardsGrid}>
          {/* CNN Card */}
          <div className={`${styles.channelCard} ${styles.cnnChannelCard}`}>
            <Brain className={`${styles.channelIcon} ${styles.cnnIconColor}`} />
            <h4 className={styles.channelTitle}>CNN Channel</h4>
            <p className={styles.channelDescription}>Extracts spatial features and local patterns from time-series data</p>
          </div>
          {/* LSTM Card */}
          <div className={`${styles.channelCard} ${styles.lstmChannelCard}`}>
            <TrendingUp className={`${styles.channelIcon} ${styles.lstmIconColor}`} />
            <h4 className={styles.channelTitle}>LSTM Channel</h4>
            <p className={styles.channelDescription}>Captures long-term dependencies and temporal relationships</p>
          </div>
          {/* GRU Card */}
          <div className={`${styles.channelCard} ${styles.gruChannelCard}`}>
            <Zap className={`${styles.channelIcon} ${styles.gruIconColor}`} />
            <h4 className={styles.channelTitle}>GRU Channel</h4>
            <p className={styles.channelDescription}>Efficient temporal modeling with reduced computational complexity</p>
          </div>
        </div>

        {/* Model Specifications */}
        <div className={styles.specificationsSection}>
          <h3 className={styles.subHeading} style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Model Specifications</h3>
          <div className={styles.specificationsList}>
            <div className={styles.specItem}>
              <span className={styles.specLabel}>Architecture Type</span>
              <span className={styles.specValue}>Hybrid Deep Learning</span>
            </div>
            <div className={styles.specItem}>
              <span className={styles.specLabel}>Input Format</span>
              <span className={styles.specValue}>Time-Series CSV</span>
            </div>
            <div className={styles.specItem}>
              <span className={styles.specLabel}>Channels</span>
              <span className={styles.specValue}>CNN + LSTM + GRU</span>
            </div>
            <div className={styles.specItem}>
              <span className={styles.specLabel}>Fusion Strategy</span>
              <span className={styles.specValue}>Concatenation + Dense Layers</span>
            </div>
            <div className={styles.specItem}>
              <span className={styles.specLabel}>Explainability Methods</span>
              <span className={styles.specValue}>ShapTime + PFI</span>
            </div>
            <div className={styles.specItem}>
              <span className={styles.specLabel}>Training Dataset Size</span>
              <span className={styles.specValue}>50,000+ samples</span>
            </div>
            <div className={styles.specItem}>
              <span className={styles.specLabel}>Model Version</span>
              <span className={styles.specValue}>v2.1.0</span>
            </div>
            {/* Status Item */}
            <div className={styles.statusItem}>
              <span className={styles.specLabel}>Model Status</span>
              <span className={styles.statusValue}>
                <span className={styles.statusDot}></span>
                Active & Ready
              </span>
            </div>
          </div>
        </div>

        {/* Explainable AI Features */}
        <div className={styles.explainabilitySection}>
          <h3 className={styles.explainabilityHeading}>
            <Zap className={styles.explainabilityIcon} />
            Explainable AI Features
          </h3>
          <p className={styles.bodyText} style={{ marginBottom: '1rem' }}>
            Our model incorporates advanced explainability techniques to help you understand which features drive predictions:
          </p>
          <ul className={styles.explainabilityList}>
            <li className={styles.listItem}>
              <Check className={styles.listCheckIcon} />
              <div>
                <span className={styles.listItemTitle}>ShapTime:</span>
                <span className={styles.listItemContent}> Time-series specific SHAP values that provide feature importance scores at each timestep, helping identify which features contribute most to predictions.</span>
              </div>
            </li>
            <li className={styles.listItem}>
              <Check className={styles.listCheckIcon} />
              <div>
                <span className={styles.listItemTitle}>Permutation Feature Importance:</span>
                <span className={styles.listItemContent}> Measures the impact of each feature on model performance by randomly shuffling feature values and observing prediction changes.</span>
              </div>
            </li>
            <li className={styles.listItem}>
              <Check className={styles.listCheckIcon} />
              <div>
                <span className={styles.listItemTitle}>Attention Visualization:</span>
                <span className={styles.listItemContent}> Visual representation of which time steps the model focuses on when making predictions, enhancing interpretability.</span>
              </div>
            </li>
          </ul>
        </div>

        {/* Performance Metrics */}
        <div className={styles.metricsSection}>
          <h3 className={styles.subHeading} style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Performance Metrics</h3>
          <div className={styles.metricsGrid}>
            {/* Accuracy Card */}
            <div className={`${styles.metricCard} ${styles.accuracyCard}`}>
              <p className={`${styles.metricValue} ${styles.accuracyValue}`}>95.8%</p>
              <p className={styles.metricLabel}>Average Accuracy</p>
            </div>
            {/* MSE Card */}
            <div className={`${styles.metricCard} ${styles.mseCard}`}>
              <p className={`${styles.metricValue} ${styles.mseValue}`}>0.018</p>
              <p className={styles.metricLabel}>Mean Squared Error</p>
            </div>
            {/* MAE Card */}
            <div className={`${styles.metricCard} ${styles.maeCard}`}>
              <p className={`${styles.metricValue} ${styles.maeValue}`}>0.134</p>
              <p className={styles.metricLabel}>Mean Absolute Error</p>
            </div>
          </div>
        </div>

        {/* Technical Details */}
        <div className={styles.technicalDetailsSection}>
          <h3 className={styles.subHeading} style={{ fontSize: '1.125rem', marginBottom: '0.75rem' }}>Technical Details</h3>
          <div className={styles.detailsList}>
            <p><span className={styles.detailLabel}>Framework:</span> TensorFlow 2.x / PyTorch</p>
            <p><span className={styles.detailLabel}>Optimizer:</span> Adam with learning rate scheduling</p>
            <p><span className={styles.detailLabel}>Loss Function:</span> Mean Squared Error (MSE)</p>
            <p><span className={styles.detailLabel}>Regularization:</span> Dropout (0.2) + L2 Regularization</p>
            <p><span className={styles.detailLabel}>Training Time:</span> ~3-4 hours on GPU</p>
            <p><span className={styles.detailLabel}>Inference Time:</span> ~50ms per prediction</p>
          </div>
        </div>
      </div>
    </div>
  );
}