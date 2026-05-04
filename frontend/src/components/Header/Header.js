import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

const Header = ({ onSearch, onMenuClick, onLogoClick, showAuthButtons = false }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleCreateClick = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  const handleProfileClick = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const handleDashboard = () => {
    navigate('/dashboard');
    setShowProfileMenu(false);
  };

  const handleLogout = () => {
    logout();
    setShowProfileMenu(false);
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-left">
        {onMenuClick && (
          <button className="menu-button" onClick={onMenuClick}>
            <svg viewBox="0 0 24 24" width="24" height="24" preserveAspectRatio="xMidYMid meet" focusable="false">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
            </svg>
          </button>
        )}
        <div className="logo" onClick={onLogoClick}>
            <svg viewBox="0 0 28 20" width="28" height="20" preserveAspectRatio="xMidYMid meet" focusable="false" className="style-scope yt-icon">
                <path fill="#FF0000" d="M27.4,3.1c-0.4-1.4-1.5-2.5-2.9-2.9C22.3,0,14,0,14,0S5.7,0,3.5,0.2C2.1,0.6,1,1.7,0.6,3.1C0,5.3,0,10,0,10s0,4.7,0.6,6.9c0.4,1.4,1.5,2.5,2.9,2.9C5.7,20,14,20,14,20s8.3,0,10.5-0.2c1.4-0.4,2.5-1.5,2.9-2.9C28,14.7,28,10,28,10S28,5.3,27.4,3.1z M11.2,14.3V5.7l7.8,4.3L11.2,14.3z"></path>
            </svg>
          <span className="logo-text">VideoShare</span>
        </div>
      </div>

      <div className="header-center">
        <form className="search-form" onSubmit={handleSubmit}>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search videos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button">
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor" d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
            </button>
          </div>
        </form>
      </div>

      <div className="header-right">
        {showAuthButtons && (
          <div className="auth-buttons">
            <button onClick={() => navigate('/login')} className="login-button">
              Sign In
            </button>
            <button onClick={() => navigate('/register')} className="register-button">
              Sign Up
            </button>
          </div>
        )}
        
        {isAuthenticated && (
          <>
            <button className="icon-button create-button" onClick={handleCreateClick} title="Upload video">
                <svg viewBox="0 0 24 24" width="24" height="24" preserveAspectRatio="xMidYMid meet" focusable="false">
                    <path d="M17,10.5V7c0-0.55-0.45-1-1-1H4C3.45,6,3,6.45,3,7v10c0,0.55,0.45,1,1,1h12c0.55,0,1-0.45,1-1v-3.5l4,4v-11L17,10.5z M14,13h-3v3H9v-3H6v-2h3V8h2v3h3V13z"></path>
                </svg>
            </button>
            <div className="profile-menu-container">
              <div className="profile-button" onClick={handleProfileClick}>
                <div className="profile-avatar">
                  {user?.firstName?.charAt(0)?.toUpperCase() || 'U'}
                </div>
              </div>
              {showProfileMenu && (
                <div className="profile-menu">
                  <div className="profile-info">
                    <div className="profile-name">
                      {user?.firstName} {user?.lastName}
                    </div>
                    <div className="profile-email">{user?.email}</div>
                  </div>
                  <div className="menu-divider"></div>
                  <button onClick={handleDashboard} className="menu-item">
                    <svg viewBox="0 0 24 24" width="20" height="20">
                      <path fill="currentColor" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    Dashboard
                  </button>
                  <button onClick={handleLogout} className="menu-item logout">
                    <svg viewBox="0 0 24 24" width="20" height="20">
                      <path fill="currentColor" d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.59L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
                    </svg>
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
