'use client';

import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useState } from 'react';
import styles from './ThemeToggle.module.css';

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme();
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = () => {
    toggleTheme();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleTheme();
    }
  };

  return (
    <div className={`${styles.themeToggleWrapper} ${className}`}>
      <button
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
        className={styles.themeToggleButton}
        aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        type="button"
        tabIndex={0}
      >
        <div className={`${styles.iconWrapper} ${theme === 'dark' ? styles.rotate : ''}`}>
          {theme === 'light' ? (
            <Sun className={styles.icon} size={20} />
          ) : (
            <Moon className={styles.icon} size={20} />
          )}
        </div>
      </button>
      
      {showTooltip && (
        <div className={styles.tooltip} role="tooltip">
          {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
        </div>
      )}
    </div>
  );
}
