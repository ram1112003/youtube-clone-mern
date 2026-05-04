import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error when user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Client-side validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    const userData = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName
    };

    const result = await register(userData);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };

  return (
    <div className="youtube-auth-container">
      <div className="youtube-auth-card register-card">
        <div className="youtube-logo-section">
          <div className="youtube-logo">
            <svg viewBox="0 0 90 20" width="90" height="20">
              <path fill="#FF0000" d="M27.9727 3.12324C27.6435 1.89323 26.6768 0.926623 25.4468 0.597366C23.2197 2.24288e-07 14.285 0 14.285 0C14.285 0 5.35042 2.24288e-07 3.12323 0.597366C1.89323 0.926623 0.926623 1.89323 0.597366 3.12324C2.24288e-07 5.35042 0 10 0 10C0 10 2.24288e-07 14.6496 0.597366 16.8768C0.926623 18.1068 1.89323 19.0734 3.12323 19.4026C5.35042 20 14.285 20 14.285 20C14.285 20 23.2197 20 25.4468 19.4026C26.6768 19.0734 27.6435 18.1068 27.9727 16.8768C28.5701 14.6496 28.5701 10 28.5701 10C28.5701 10 28.5701 5.35042 27.9727 3.12324Z"/>
              <path fill="white" d="M11.4253 14.2854L18.8477 10.0004L11.4253 5.71533V14.2854Z"/>
            </svg>
            <span className="logo-text">VideoShare</span>
          </div>
          <h1>Create your account</h1>
          <p>to continue to VideoShare</p>
        </div>

        {error && (
          <div className="youtube-error-alert">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="youtube-auth-form">
          <div className="youtube-form-row">
            <div className="youtube-input-group">
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                placeholder=" "
                disabled={loading}
                className="youtube-input"
              />
              <label htmlFor="firstName" className="youtube-label">First name</label>
            </div>

            <div className="youtube-input-group">
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                placeholder=" "
                disabled={loading}
                className="youtube-input"
              />
              <label htmlFor="lastName" className="youtube-label">Last name</label>
            </div>
          </div>

          <div className="youtube-input-group">
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder=" "
              disabled={loading}
              className="youtube-input"
            />
            <label htmlFor="username" className="youtube-label">Username</label>
            <div className="youtube-input-helper">You can use letters, numbers and periods</div>
          </div>

          <div className="youtube-input-group">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder=" "
              disabled={loading}
              className="youtube-input"
            />
            <label htmlFor="email" className="youtube-label">Email</label>
          </div>

          <div className="youtube-form-row">
            <div className="youtube-input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder=" "
                disabled={loading}
                className="youtube-input"
              />
              <label htmlFor="password" className="youtube-label">Password</label>
              <button
                type="button"
                className="youtube-password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>

            <div className="youtube-input-group">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder=" "
                disabled={loading}
                className="youtube-input"
              />
              <label htmlFor="confirmPassword" className="youtube-label">Confirm</label>
              <button
                type="button"
                className="youtube-password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={loading}
              >
                {showConfirmPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <div className="youtube-password-requirements">
            <p>Use 6 or more characters with a mix of letters, numbers & symbols</p>
          </div>

          <div className="youtube-form-actions">
            <Link to="/login" className="youtube-signin-instead">
              Sign in instead
            </Link>
            <button 
              type="submit" 
              className="youtube-signin-button"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create'}
            </button>
          </div>
        </form>

        <div className="youtube-auth-footer">
          <div className="youtube-language-selector">
            <select className="youtube-language">
              <option value="en">English (United States)</option>
            </select>
          </div>
          <div className="youtube-footer-links">
            <a href="#" className="youtube-footer-link">Help</a>
            <a href="#" className="youtube-footer-link">Privacy</a>
            <a href="#" className="youtube-footer-link">Terms</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
