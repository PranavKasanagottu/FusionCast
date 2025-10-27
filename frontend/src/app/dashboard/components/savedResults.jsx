'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../../../lib/supabaseClient';
import { FileText, Calendar, TrendingUp, Download, Trash2, Eye, BarChart3 } from 'lucide-react';
import styles from './SavedResults.module.css';

export default function SavedResults() {
  const [forecasts, setForecasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadForecasts();
  }, []);

  const loadForecasts = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setError('Not authenticated');
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('forecasts')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setForecasts(data || []);
      setError(null);
    } catch (err) {
      console.error('Error loading forecasts:', err);
      setError('Failed to load forecasts');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this forecast?')) return;

    try {
      const { error } = await supabase
        .from('forecasts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      loadForecasts();
    } catch (err) {
      console.error('Error deleting forecast:', err);
      alert('Failed to delete forecast');
    }
  };

  const handleDownload = (forecast) => {
    const csvContent = [
      ['Date', 'Forecasted Sales'],
      ...forecast.forecast_data.dates.map((date, idx) => [
        date,
        forecast.forecast_data.sales[idx]
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `forecast_${forecast.name}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const calculateMetrics = (forecast) => {
    const sales = forecast.forecast_data.sales || [];
    return {
      avg: sales.length > 0 ? (sales.reduce((a, b) => a + b, 0) / sales.length).toFixed(2) : 0,
      max: sales.length > 0 ? Math.max(...sales).toFixed(2) : 0,
      min: sales.length > 0 ? Math.min(...sales).toFixed(2) : 0,
    };
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading forecasts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p>{error}</p>
        <button onClick={loadForecasts} className={styles.retryButton}>
          Retry
        </button>
      </div>
    );
  }

  if (forecasts.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <FileText className={styles.emptyIcon} />
        <h2>No Forecasts Yet</h2>
        <p>Upload a CSV file to generate your first forecast</p>
      </div>
    );
  }

  return (
    <div className={styles.savedResultsContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          <BarChart3 className={styles.titleIcon} />
          My Forecasts
        </h1>
        <button onClick={loadForecasts} className={styles.refreshButton}>
          Refresh
        </button>
      </div>

      <div className={styles.forecastsGrid}>
        {forecasts.map((forecast) => {
          const metrics = calculateMetrics(forecast);
          const createdDate = new Date(forecast.created_at).toLocaleDateString();

          return (
            <div key={forecast.id} className={styles.forecastCard}>
              <div className={styles.cardHeader}>
                <FileText className={styles.cardIcon} />
                <div className={styles.cardTitleSection}>
                  <h3 className={styles.cardTitle}>{forecast.name}</h3>
                  <div className={styles.cardDate}>
                    <Calendar className={styles.dateIcon} />
                    {createdDate}
                  </div>
                </div>
              </div>

              <div className={styles.metricsRow}>
                <div className={styles.metricItem}>
                  <TrendingUp className={styles.metricIcon} />
                  <div>
                    <p className={styles.metricLabel}>Average</p>
                    <p className={styles.metricValue}>{metrics.avg}</p>
                  </div>
                </div>
                <div className={styles.metricItem}>
                  <TrendingUp className={styles.metricIcon} />
                  <div>
                    <p className={styles.metricLabel}>Maximum</p>
                    <p className={styles.metricValue}>{metrics.max}</p>
                  </div>
                </div>
                <div className={styles.metricItem}>
                  <TrendingUp className={styles.metricIcon} />
                  <div>
                    <p className={styles.metricLabel}>Minimum</p>
                    <p className={styles.metricValue}>{metrics.min}</p>
                  </div>
                </div>
              </div>

              <div className={styles.cardActions}>
                <button
                  onClick={() => window.location.href = `/dashboard?section=results&data=${encodeURIComponent(JSON.stringify({
                    historical: forecast.historical_data,
                    forecast: forecast.forecast_data,
                    metrics: forecast.metrics
                  }))}`}
                  className={styles.viewButton}
                >
                  <Eye className={styles.actionIcon} />
                  View Details
                </button>
                <button
                  onClick={() => handleDownload(forecast)}
                  className={styles.downloadButton}
                >
                  <Download className={styles.actionIcon} />
                  Download
                </button>
                <button
                  onClick={() => handleDelete(forecast.id)}
                  className={styles.deleteButton}
                >
                  <Trash2 className={styles.actionIcon} />
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

