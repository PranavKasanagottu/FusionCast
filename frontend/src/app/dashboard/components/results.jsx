'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { TrendingUp, TrendingDown, Calendar, BarChart3, AlertCircle } from 'lucide-react';
import styles from './Results.module.css';

export default function ResultsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        // Get URL parameters
        const params = new URLSearchParams(window.location.search);
        const dataStr = params.get('data');
        
        if (dataStr) {
          const data = JSON.parse(decodeURIComponent(dataStr));
          setForecastData(data);
          
          // Prepare chart data
          const chart = {
            labels: [...data.historical.dates, ...data.forecast.dates],
            historicalValues: data.historical.sales,
            forecastValues: data.forecast.sales,
            historicalCount: data.historical.sales.length
          };
          setChartData(chart);
        }
      } catch (err) {
        setError('Failed to load forecast results');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  const renderChart = () => {
    if (!chartData) return null;

    const { labels, historicalValues, forecastValues, historicalCount } = chartData;
    const combinedValues = [...historicalValues, ...forecastValues];
    const maxValue = Math.max(...combinedValues);
    const minValue = Math.min(...combinedValues);
    const range = maxValue - minValue;

    return (
      <div className={styles.chartContainer}>
        <div className={styles.chartTitle}>Forecast Visualization</div>
        <div className={styles.chart}>
          {combinedValues.map((value, idx) => (
            <div key={idx} className={styles.barContainer}>
              <div className={styles.barWrapper}>
                <div
                  className={`${styles.bar} ${
                    idx >= historicalCount ? styles.barForecast : styles.barHistorical
                  }`}
                  style={{
                    height: `${((value - minValue) / range) * 100}%`,
                  }}
                  title={`${labels[idx]}: ${value.toFixed(2)}`}
                />
              </div>
              {idx % 5 === 0 && (
                <span className={styles.barLabel}>
                  {labels[idx]?.split('-')[1]}
                </span>
              )}
            </div>
          ))}
        </div>
        <div className={styles.chartLegend}>
          <div className={styles.legendItem}>
            <div className={`${styles.legendColor} ${styles.barHistorical}`}></div>
            <span>Historical Data</span>
          </div>
          <div className={styles.legendItem}>
            <div className={`${styles.legendColor} ${styles.barForecast}`}></div>
            <span>Forecast</span>
          </div>
        </div>
        <div className={styles.separator} />
      </div>
    );
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading forecast results...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <AlertCircle className={styles.errorIcon} />
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => router.push('/dashboard')} className={styles.errorButton}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  if (!forecastData) {
    return (
      <div className={styles.errorContainer}>
        <AlertCircle className={styles.errorIcon} />
        <h2>No Data</h2>
        <p>No forecast data available</p>
        <button onClick={() => router.push('/dashboard')} className={styles.errorButton}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  const metrics = forecastData.metrics;
  const isPositiveTrend = metrics.forecast_change_percent >= 0;

  return (
    <div className={styles.resultsContainer}>
      <div className={styles.resultsHeader}>
        <h1 className={styles.mainTitle}>
          <Calendar className={styles.titleIcon} />
          Forecast Results
        </h1>
        <button onClick={() => router.push('/dashboard')} className={styles.backButton}>
          Back to Dashboard
        </button>
      </div>

      <div className={styles.metricsGrid}>
        <div className={styles.metricCard}>
          <div className={styles.metricHeader}>
            <BarChart3 className={styles.metricIcon} />
            <span className={styles.metricLabel}>Average Forecast</span>
          </div>
          <div className={styles.metricValue}>{metrics.average_forecast}</div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricHeader}>
            <TrendingUp className={styles.metricIcon} />
            <span className={styles.metricLabel}>Peak Forecast</span>
          </div>
          <div className={styles.metricValue}>{metrics.max_forecast}</div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricHeader}>
            <TrendingDown className={styles.metricIcon} />
            <span className={styles.metricLabel}>Min Forecast</span>
          </div>
          <div className={styles.metricValue}>{metrics.min_forecast}</div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricHeader}>
            {isPositiveTrend ? (
              <TrendingUp className={`${styles.metricIcon} ${styles.trendPositive}`} />
            ) : (
              <TrendingDown className={`${styles.metricIcon} ${styles.trendNegative}`} />
            )}
            <span className={styles.metricLabel}>Trend</span>
          </div>
          <div className={`${styles.metricValue} ${isPositiveTrend ? styles.trendPositive : styles.trendNegative}`}>
            {isPositiveTrend ? '+' : ''}{metrics.forecast_change_percent}%
          </div>
        </div>
      </div>

      {renderChart()}

      <div className={styles.forecastDetails}>
        <h2 className={styles.sectionTitle}>30-Day Forecast Values</h2>
        <div className={styles.forecastTable}>
          <div className={styles.forecastRow}>
            <div className={styles.forecastCell}><strong>Date</strong></div>
            <div className={styles.forecastCell}><strong>Forecasted Sales</strong></div>
          </div>
          {forecastData.forecast.dates.map((date, idx) => (
            <div key={idx} className={styles.forecastRow}>
              <div className={styles.forecastCell}>{date}</div>
              <div className={styles.forecastCell}>{forecastData.forecast.sales[idx].toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

