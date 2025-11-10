'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  TrendingUp, TrendingDown, Calendar, BarChart3, AlertCircle, 
  Brain, Zap, LineChart, Activity, Shuffle, Download 
} from 'lucide-react';
import styles from './Results.module.css';

export default function ResultsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

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

  const renderLineChart = () => {
    if (!chartData) return null;

    const { labels, historicalValues, forecastValues, historicalCount } = chartData;
    const combinedValues = [...historicalValues, ...forecastValues];
    const maxValue = Math.max(...combinedValues);
    const minValue = Math.min(...combinedValues);
    const range = maxValue - minValue;
    const padding = range * 0.1;

    return (
      <div className={styles.lineChartContainer}>
        <svg className={styles.lineChart} viewBox="0 0 1000 400" preserveAspectRatio="xMidYMid meet">
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={`grid-${i}`}>
              <line
                x1="50"
                y1={50 + (i * 300) / 4}
                x2="950"
                y2={50 + (i * 300) / 4}
                stroke="var(--border)"
                strokeWidth="1"
                strokeDasharray="5,5"
              />
              <text
                x="30"
                y={50 + (i * 300) / 4 + 5}
                fill="var(--muted-foreground)"
                fontSize="12"
                textAnchor="end"
              >
                {(maxValue + padding - (i * (range + 2 * padding)) / 4).toFixed(0)}
              </text>
            </g>
          ))}

          {/* Historical line */}
          <polyline
            points={historicalValues
              .map((val, idx) => {
                const x = 50 + (idx / (combinedValues.length - 1)) * 900;
                const y = 350 - ((val - minValue + padding) / (range + 2 * padding)) * 300;
                return `${x},${y}`;
              })
              .join(' ')}
            fill="none"
            stroke="hsl(220, 70%, 55%)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Forecast line */}
          <polyline
            points={forecastValues
              .map((val, idx) => {
                const actualIdx = historicalCount + idx - 1;
                const x = 50 + (actualIdx / (combinedValues.length - 1)) * 900;
                const y = 350 - ((val - minValue + padding) / (range + 2 * padding)) * 300;
                return `${x},${y}`;
              })
              .join(' ')}
            fill="none"
            stroke="hsl(142, 70%, 55%)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="8,4"
          />

          {/* Connection point */}
          <circle
            cx={50 + ((historicalCount - 1) / (combinedValues.length - 1)) * 900}
            cy={350 - ((historicalValues[historicalValues.length - 1] - minValue + padding) / (range + 2 * padding)) * 300}
            r="5"
            fill="hsl(220, 70%, 55%)"
          />

          {/* Data points */}
          {combinedValues.map((val, idx) => {
            if (idx % 3 !== 0 && idx !== combinedValues.length - 1) return null;
            const x = 50 + (idx / (combinedValues.length - 1)) * 900;
            const y = 350 - ((val - minValue + padding) / (range + 2 * padding)) * 300;
            const isForecast = idx >= historicalCount;
            
            return (
              <g key={`point-${idx}`}>
                <circle
                  cx={x}
                  cy={y}
                  r="4"
                  fill={isForecast ? 'hsl(142, 70%, 55%)' : 'hsl(220, 70%, 55%)'}
                  className={styles.dataPoint}
                />
                <title>{`${labels[idx]}: ${val.toFixed(2)}`}</title>
              </g>
            );
          })}

          {/* X-axis labels */}
          {labels.map((label, idx) => {
            if (idx % 10 !== 0 && idx !== labels.length - 1) return null;
            const x = 50 + (idx / (combinedValues.length - 1)) * 900;
            return (
              <text
                key={`label-${idx}`}
                x={x}
                y="380"
                fill="var(--muted-foreground)"
                fontSize="11"
                textAnchor="middle"
              >
                {label.split('-').slice(1).join('/')}
              </text>
            );
          })}
        </svg>

        <div className={styles.chartLegend}>
          <div className={styles.legendItem}>
            <div className={styles.legendLine} style={{ background: 'hsl(220, 70%, 55%)' }}></div>
            <span>Historical Data ({historicalValues.length} days)</span>
          </div>
          <div className={styles.legendItem}>
            <div className={styles.legendLine} style={{ 
              background: 'hsl(142, 70%, 55%)',
              backgroundImage: 'repeating-linear-gradient(90deg, hsl(142, 70%, 55%), hsl(142, 70%, 55%) 8px, transparent 8px, transparent 12px)'
            }}></div>
            <span>Forecast ({forecastValues.length} days)</span>
          </div>
        </div>
      </div>
    );
  };

  const renderOverview = () => {
    if (!forecastData) return null;

    return (
      <div className={styles.overviewContainer}>
        {renderLineChart()}
        
        <div className={styles.insightsGrid}>
          <div className={styles.insightCard}>
            <div className={styles.insightHeader}>
              <Activity className={styles.insightIcon} />
              <h3>Forecast Summary</h3>
            </div>
            <div className={styles.insightContent}>
              <div className={styles.insightRow}>
                <span>Average Predicted Sales:</span>
                <strong>{forecastData.metrics.average_forecast}</strong>
              </div>
              <div className={styles.insightRow}>
                <span>Peak Forecast:</span>
                <strong className={styles.positive}>{forecastData.metrics.max_forecast}</strong>
              </div>
              <div className={styles.insightRow}>
                <span>Minimum Forecast:</span>
                <strong className={styles.negative}>{forecastData.metrics.min_forecast}</strong>
              </div>
              <div className={styles.insightRow}>
                <span>Forecast Volatility (Std Dev):</span>
                <strong>{forecastData.metrics.std_forecast}</strong>
              </div>
            </div>
          </div>

          <div className={styles.insightCard}>
            <div className={styles.insightHeader}>
              <TrendingUp className={styles.insightIcon} />
              <h3>Trend Analysis</h3>
            </div>
            <div className={styles.insightContent}>
              <div className={styles.trendIndicator}>
                <div className={styles.trendValue}>
                  {forecastData.metrics.forecast_change_percent >= 0 ? '+' : ''}
                  {forecastData.metrics.forecast_change_percent}%
                </div>
                <div className={styles.trendLabel}>
                  {forecastData.metrics.forecast_change_percent >= 0 ? 'Growth' : 'Decline'} vs Historical Average
                </div>
              </div>
              <div className={styles.insightRow}>
                <span>Historical Average:</span>
                <strong>{forecastData.metrics.average_historical}</strong>
              </div>
              <div className={styles.insightRow}>
                <span>Historical Volatility:</span>
                <strong>{forecastData.metrics.std_historical}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSHAP = () => {
    if (!forecastData?.explainability?.shap_values || Object.keys(forecastData.explainability.shap_values).length === 0) {
      return (
        <div className={styles.explainabilityEmpty}>
          <Brain className={styles.emptyIcon} />
          <p>SHAP analysis not available</p>
        </div>
      );
    }

    const { shap_values, feature_descriptions } = forecastData.explainability;
    const shapEntries = Object.entries(shap_values).sort((a, b) => b[1] - a[1]);
    const maxImportance = Math.max(...shapEntries.map(([_, val]) => val));

    return (
      <div className={styles.explainabilityContainer}>
        <div className={styles.explainabilityHeader}>
          <Brain className={styles.explainabilityIcon} />
          <div>
            <h3>SHAP Feature Importance</h3>
            <p className={styles.explainabilitySubtext}>
              Gradient-based approximation showing feature contributions to predictions
            </p>
          </div>
        </div>

        <div className={styles.importanceChart}>
          {shapEntries.map(([feature, importance], idx) => {
            const percentage = (importance / maxImportance) * 100;
            const displayValue = (importance * 100).toFixed(1);
            
            return (
              <div key={feature} className={styles.importanceRow}>
                <div className={styles.importanceLabel}>
                  <span className={styles.featureName}>
                    <span className={styles.rank}>#{idx + 1}</span>
                    {feature}
                  </span>
                  <span className={styles.featureDesc}>
                    {feature_descriptions[feature] || ''}
                  </span>
                </div>
                <div className={styles.importanceBarContainer}>
                  <div 
                    className={styles.importanceBar}
                    style={{ 
                      width: `${percentage}%`,
                      backgroundColor: `hsl(${220 - idx * 12}, 70%, ${60 - idx * 2}%)`
                    }}
                  />
                  <span className={styles.importanceValue}>{displayValue}%</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.explainabilityFooter}>
          <Zap className={styles.footerIcon} />
          <p>
            <strong>SHAP (SHapley Additive exPlanations)</strong> uses gradient-based approximation 
            to show how much each feature contributes to the forecast. Higher percentages indicate 
            stronger influence on predictions.
          </p>
        </div>
      </div>
    );
  };

  const renderPFI = () => {
    if (!forecastData?.explainability?.pfi_values || Object.keys(forecastData.explainability.pfi_values).length === 0) {
      return (
        <div className={styles.explainabilityEmpty}>
          <Shuffle className={styles.emptyIcon} />
          <p>PFI analysis not available (requires 60+ days of historical data)</p>
        </div>
      );
    }

    const { pfi_values, feature_descriptions } = forecastData.explainability;
    const pfiEntries = Object.entries(pfi_values)
      .map(([feature, data]) => [feature, data.mean, data.std])
      .sort((a, b) => b[1] - a[1]);
    
    const maxImportance = Math.max(...pfiEntries.map(([_, mean]) => Math.abs(mean)));

    return (
      <div className={styles.explainabilityContainer}>
        <div className={styles.explainabilityHeader}>
          <Shuffle className={styles.explainabilityIcon} />
          <div>
            <h3>Permutation Feature Importance (PFI)</h3>
            <p className={styles.explainabilitySubtext}>
              Model performance drop when each feature is randomly shuffled
            </p>
          </div>
        </div>

        <div className={styles.importanceChart}>
          {pfiEntries.map(([feature, mean, std], idx) => {
            const percentage = (Math.abs(mean) / maxImportance) * 100;
            const displayValue = Math.abs(mean).toFixed(3);
            
            return (
              <div key={feature} className={styles.importanceRow}>
                <div className={styles.importanceLabel}>
                  <span className={styles.featureName}>
                    <span className={styles.rank}>#{idx + 1}</span>
                    {feature}
                  </span>
                  <span className={styles.featureDesc}>
                    {feature_descriptions[feature] || ''}
                  </span>
                </div>
                <div className={styles.importanceBarContainer}>
                  <div 
                    className={styles.importanceBar}
                    style={{ 
                      width: `${percentage}%`,
                      backgroundColor: `hsl(${142 - idx * 12}, 65%, ${55 - idx * 2}%)`
                    }}
                  />
                  <span className={styles.importanceValue}>
                    {displayValue} <span className={styles.std}>(±{std.toFixed(3)})</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.explainabilityFooter}>
          <Zap className={styles.footerIcon} />
          <p>
            <strong>PFI (Permutation Feature Importance)</strong> measures how much model 
            performance decreases when a feature is randomly shuffled. Higher values indicate 
            the feature is more critical for accurate predictions. Standard deviation shows consistency.
          </p>
        </div>
      </div>
    );
  };

  const renderForecastTable = () => {
    if (!forecastData) return null;

    return (
      <div className={styles.forecastTableContainer}>
        <div className={styles.tableHeader}>
          <h3>30-Day Detailed Forecast</h3>
          <button className={styles.downloadBtn} onClick={() => downloadCSV()}>
            <Download size={16} />
            Export CSV
          </button>
        </div>
        <div className={styles.forecastTable}>
          <div className={styles.tableRow + ' ' + styles.tableHeaderRow}>
            <div className={styles.tableCell}>Day</div>
            <div className={styles.tableCell}>Date</div>
            <div className={styles.tableCell}>Forecasted Sales</div>
            <div className={styles.tableCell}>Change from Avg</div>
          </div>
          {forecastData.forecast.dates.map((date, idx) => {
            const value = forecastData.forecast.sales[idx];
            const avgForecast = forecastData.metrics.average_forecast;
            const change = ((value - avgForecast) / avgForecast * 100).toFixed(1);
            const isAboveAvg = value > avgForecast;
            
            return (
              <div key={idx} className={styles.tableRow}>
                <div className={styles.tableCell}>
                  <span className={styles.dayNumber}>Day {idx + 1}</span>
                </div>
                <div className={styles.tableCell}>{date}</div>
                <div className={styles.tableCell}>
                  <strong>{value.toFixed(2)}</strong>
                </div>
                <div className={styles.tableCell}>
                  <span className={isAboveAvg ? styles.positive : styles.negative}>
                    {isAboveAvg ? '+' : ''}{change}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const downloadCSV = () => {
    if (!forecastData) return;
    
    const csvContent = [
      ['Date', 'Forecasted Sales'],
      ...forecastData.forecast.dates.map((date, idx) => [
        date,
        forecastData.forecast.sales[idx].toFixed(2)
      ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `forecast_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
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
          <LineChart className={styles.titleIcon} />
          Forecast Analysis
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
          <div className={styles.metricSubtext}>Next 30 days</div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricHeader}>
            <TrendingUp className={styles.metricIcon} />
            <span className={styles.metricLabel}>Peak Forecast</span>
          </div>
          <div className={styles.metricValue}>{metrics.max_forecast}</div>
          <div className={styles.metricSubtext}>Maximum predicted</div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricHeader}>
            <TrendingDown className={styles.metricIcon} />
            <span className={styles.metricLabel}>Min Forecast</span>
          </div>
          <div className={styles.metricValue}>{metrics.min_forecast}</div>
          <div className={styles.metricSubtext}>Minimum predicted</div>
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
          <div className={styles.metricSubtext}>vs historical avg</div>
        </div>
      </div>

      <div className={styles.tabContainer}>
        <button 
          className={`${styles.tab} ${activeTab === 'overview' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <LineChart size={18} />
          Overview
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'details' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('details')}
        >
          <BarChart3 size={18} />
          Detailed Forecast
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'shap' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('shap')}
        >
          <Brain size={18} />
          SHAP Analysis
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'pfi' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('pfi')}
        >
          <Shuffle size={18} />
          PFI Analysis
        </button>
      </div>

      <div className={styles.tabContent}>
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'details' && renderForecastTable()}
        {activeTab === 'shap' && renderSHAP()}
        {activeTab === 'pfi' && renderPFI()}
      </div>
    </div>
  );
}

