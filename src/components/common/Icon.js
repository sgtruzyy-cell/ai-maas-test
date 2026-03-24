import React from 'react';

/**
 * Icon component using Remix Icon (loaded via CDN in index.html).
 * Matching Figma design (outlined style).
 */
function Icon({ name, size = 20, color = 'currentColor', style = {}, className = '' }) {
  const iconMap = {
    // Sidebar & Navigation
    'overview': 'ri-dashboard-horizontal-line',
    'model-square': 'ri-apps-2-line',
    'experience-center': 'ri-magic-line',
    'model-warehouse': 'ri-database-2-line',
    'model-deploy': 'ri-rocket-line',
    'model-service': 'ri-server-line',
    'model-security': 'ri-shield-check-line',
    'app-lab': 'ri-flask-line',
    'prompt-lab': 'ri-code-box-line',
    'model-inference': 'ri-speed-up-line',
    'model-custom': 'ri-key-2-line',
    'data-management': 'ri-database-line',
    'system-management': 'ri-settings-4-line',

    // UI UI Elements
    'chevron-down': 'ri-arrow-down-s-line',
    'chevron-up': 'ri-arrow-up-s-line',
    'search': 'ri-search-line',
    'close': 'ri-close-line',
    'refresh': 'ri-refresh-line',
    'reset': 'ri-restart-line',
    'external-link': 'ri-external-link-line',

    // Metrics & Charts
    'chart-line': 'ri-line-chart-line',
    'chart-pie': 'ri-pie-chart-line',
    'error': 'ri-error-warning-line',
    'time': 'ri-time-line',
    'speed': 'ri-speed-up-line',
    'alert': 'ri-alert-line',
    'model-logo': 'ri-box-3-fill', // Box shape logo for model cards
    'logo': 'ri-hexagon-fill', // Default logo, overridden by SVG in components
  };

  const riClass = iconMap[name] || name; // Fallback to name if not in map

  return (
    <i
      className={`${riClass} ${className}`}
      style={{
        fontSize: `${size}px`,
        color,
        verticalAlign: 'middle',
        ...style
      }}
    />
  );
}

export default Icon;