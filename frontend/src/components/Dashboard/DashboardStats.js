import React from 'react';

const DashboardStats = ({ stats, loading }) => {
  if (loading) {
    return (
      <div className="youtube-dashboard-stats">
        <div className="stats-header">
          <h2>Channel analytics</h2>
          <p>Loading your channel performance data...</p>
        </div>
        <div className="youtube-stats-grid">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="youtube-stat-card loading">
              <div className="stat-skeleton"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="youtube-dashboard-stats">
      <div className="stats-header">
        <h2>Channel analytics</h2>
        <p>Current period performance</p>
        <div className="stats-period">
          <span className="period-label">Last 28 days</span>
        </div>
      </div>

      <div className="youtube-stats-grid">
        <div className="youtube-stat-card">
          <div className="stat-header">
            <div className="stat-title">
              <svg className="stat-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/>
              </svg>
              <span>Content</span>
            </div>
          </div>
          <div className="stat-content">
            <div className="stat-number">{stats.totalVideos}</div>
            <div className="stat-label">Videos published</div>
          </div>
        </div>

        <div className="youtube-stat-card">
          <div className="stat-header">
            <div className="stat-title">
              <svg className="stat-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
              </svg>
              <span>Views</span>
            </div>
          </div>
          <div className="stat-content">
            <div className="stat-number">{formatNumber(stats.totalViews)}</div>
            <div className="stat-label">Total impressions</div>
            <div className="stat-change positive">+12.5%</div>
          </div>
        </div>

        <div className="youtube-stat-card">
          <div className="stat-header">
            <div className="stat-title">
              <svg className="stat-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73V10z"/>
              </svg>
              <span>Engagement</span>
            </div>
          </div>
          <div className="stat-content">
            <div className="stat-number">{formatNumber(stats.totalLikes)}</div>
            <div className="stat-label">Likes received</div>
            <div className="stat-change positive">+8.2%</div>
          </div>
        </div>

        <div className="youtube-stat-card">
          <div className="stat-header">
            <div className="stat-title">
              <svg className="stat-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
              </svg>
              <span>Performance</span>
            </div>
          </div>
          <div className="stat-content">
            <div className="stat-number">{formatNumber(Math.round(stats.avgViews))}</div>
            <div className="stat-label">Average views per video</div>
            <div className="stat-change positive">+15.7%</div>
          </div>
        </div>
      </div>

      {/* Additional Analytics Cards */}
      <div className="analytics-section">
        <h3>Recent performance</h3>
        <div className="analytics-cards">
          <div className="analytics-card">
            <div className="card-header">
              <h4>Top performing video</h4>
              <span className="card-period">Last 7 days</span>
            </div>
            <div className="card-content">
              {stats.totalVideos > 0 ? (
                <div className="top-video">
                  <div className="video-thumbnail-placeholder"></div>
                  <div className="video-info">
                    <p className="video-title">Your latest upload</p>
                    <p className="video-stats">{formatNumber(Math.round(stats.avgViews))} views</p>
                  </div>
                </div>
              ) : (
                <div className="no-data">
                  <p>No videos published yet</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="analytics-card">
            <div className="card-header">
              <h4>Channel growth</h4>
              <span className="card-period">This month</span>
            </div>
            <div className="card-content">
              <div className="growth-metric">
                <span className="growth-label">Subscriber growth</span>
                <span className="growth-value">+{Math.round(stats.totalViews / 100) || 0}</span>
              </div>
              <div className="growth-metric">
                <span className="growth-label">Watch time (hours)</span>
                <span className="growth-value">{Math.round(stats.totalViews / 10) || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {stats.totalVideos === 0 && (
        <div className="youtube-empty-state">
          <div className="empty-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/>
            </svg>
          </div>
          <h3>Grow your channel on YouTube</h3>
          <p>Start by uploading your first video to see analytics data here</p>
          <button className="cta-button">Upload video</button>
        </div>
      )}
    </div>
  );
};

export default DashboardStats;
