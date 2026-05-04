import React from 'react';
import './Sidebar.css';

const Sidebar = ({ isOpen }) => {
  const menuItems = [
    {
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24">
          <path fill="currentColor" d="M4 21V10.08l8-6.96 8 6.96V21h-6v-6h-4v6H4z"/>
        </svg>
      ),
      label: 'Home',
      active: true
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24">
          <path fill="currentColor" d="M9.8 21.6L8.4 20.2l4.4-4.4-4.4-4.4 1.4-1.4 5.8 5.8-5.8 5.8z"/>
        </svg>
      ),
      label: 'Shorts'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24">
          <path fill="currentColor" d="M10 18v-6l5 3-5 3zm7-15H7v1h10V3zm3 3H4v1h16V6zm2 3H2v8c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9z"/>
        </svg>
      ),
      label: 'Subscriptions'
    }
  ];

  const libraryItems = [
    {
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24">
          <path fill="currentColor" d="M11 7l6 3.5L11 14V7zm8 6.5c0-.77-.25-1.46-.65-2.05L18 12c0 .33-.08.65-.23.94l.58-.94c.4.59.65 1.28.65 2.05 0 .77-.25 1.46-.65 2.05L18 16c0-.33.08-.65.23-.94l-.58.94c-.4-.59-.65-1.28-.65-2.05z"/>
        </svg>
      ),
      label: 'Library'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24">
          <path fill="currentColor" d="M12 3.75l-8.89 16.05h17.78L12 3.75zM12 8.5l5.33 9.62H6.67L12 8.5z"/>
        </svg>
      ),
      label: 'History'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24">
          <path fill="currentColor" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ),
      label: 'Your videos'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24">
          <path fill="currentColor" d="M14.97 16.95L10 13.87V7h2v5.76l4.03 2.49-1.06 1.7zM12 3c-4.96 0-9 4.04-9 9s4.04 9 9 9 9-4.04 9-9-4.04-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7z"/>
        </svg>
      ),
      label: 'Watch later'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24">
          <path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      ),
      label: 'Liked videos'
    }
  ];

  const exploreItems = [
    { label: 'Trending', icon: '🔥' },
    { label: 'Shopping', icon: '🛍️' },
    { label: 'Music', icon: '🎵' },
    { label: 'Movies', icon: '🎬' },
    { label: 'Live', icon: '📺' },
    { label: 'Gaming', icon: '🎮' },
    { label: 'News', icon: '📰' },
    { label: 'Sports', icon: '🏆' },
    { label: 'Learning', icon: '💡' },
    { label: 'Fashion & Beauty', icon: '👗' }
  ];

  return (
    <aside className={`sidebar ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <div className="sidebar-content">
        {/* Main Menu */}
        <div className="sidebar-section">
          {menuItems.map((item, index) => (
            <div key={index} className={`sidebar-item ${item.active ? 'active' : ''}`}>
              <div className="sidebar-icon">{item.icon}</div>
              {isOpen && <span className="sidebar-label">{item.label}</span>}
            </div>
          ))}
        </div>

        {isOpen && (
          <>
            <div className="sidebar-divider"></div>

            {/* Library Section */}
            <div className="sidebar-section">
              <div className="sidebar-section-title">Library</div>
              {libraryItems.map((item, index) => (
                <div key={index} className="sidebar-item">
                  <div className="sidebar-icon">{item.icon}</div>
                  <span className="sidebar-label">{item.label}</span>
                </div>
              ))}
            </div>

            <div className="sidebar-divider"></div>

            {/* Explore Section */}
            <div className="sidebar-section">
              <div className="sidebar-section-title">Explore</div>
              {exploreItems.map((item, index) => (
                <div key={index} className="sidebar-item">
                  <div className="sidebar-icon emoji-icon">{item.icon}</div>
                  <span className="sidebar-label">{item.label}</span>
                </div>
              ))}
            </div>

            <div className="sidebar-divider"></div>

            {/* Footer */}
            <div className="sidebar-footer">
              <div className="sidebar-footer-links">
                <a href="#" className="footer-link">About</a>
                <a href="#" className="footer-link">Press</a>
                <a href="#" className="footer-link">Copyright</a>
                <a href="#" className="footer-link">Contact us</a>
                <a href="#" className="footer-link">Creators</a>
                <a href="#" className="footer-link">Advertise</a>
                <a href="#" className="footer-link">Developers</a>
              </div>
              <div className="sidebar-footer-links">
                <a href="#" className="footer-link">Terms</a>
                <a href="#" className="footer-link">Privacy</a>
                <a href="#" className="footer-link">Policy & Safety</a>
                <a href="#" className="footer-link">How YouTube works</a>
                <a href="#" className="footer-link">Test new features</a>
              </div>
              <div className="sidebar-copyright">
                © 2024 Google LLC
              </div>
            </div>
          </>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
