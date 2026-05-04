import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import { videoAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import './VideoPage.css';

const VideoPage = () => {
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const loadVideo = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await videoAPI.getVideoById(id);
        if (response.data.success) {
          setVideo(response.data.data.video);
        }
      } catch (error) {
        console.error('Error fetching video:', error);
        const message = error.response?.data?.message || 'Video not found';
        setError(message);
      }
      setLoading(false);
    };

    if (id) {
      loadVideo();
    }
  }, [id]);

  const handleBack = () => {
    navigate('/');
  };

  const handleSearch = async (query) => {
    navigate(`/?search=${encodeURIComponent(query)}`);
  };

  if (loading) {
    return (
      <div className="video-page">
        <Header 
          onSearch={handleSearch} 
          onLogoClick={handleBack}
          showAuthButtons={!isAuthenticated}
        />
        <div className="video-page-content">
          <div className="loading-container">
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Loading video...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="video-page">
        <Header 
          onSearch={handleSearch} 
          onLogoClick={handleBack}
          showAuthButtons={!isAuthenticated}
        />
        <div className="video-page-content">
          <div className="error-container">
            <div className="error-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z" />
              </svg>
            </div>
            <h2>Video Not Found</h2>
            <p>{error}</p>
            <button onClick={handleBack} className="back-button">
              Go Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="video-page">
      <Header 
        onSearch={handleSearch} 
        onLogoClick={handleBack}
        showAuthButtons={!isAuthenticated}
      />
      <div className="video-page-content">
        <VideoPlayer 
          video={video} 
          onBack={handleBack}
        />
      </div>
    </div>
  );
};

export default VideoPage;
