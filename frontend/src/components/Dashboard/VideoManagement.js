import React, { useState, useEffect } from 'react';
import { videoAPI, getFileUrl } from '../../services/api';

const VideoManagement = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingVideo, setEditingVideo] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    category: '',
    tags: '',
    isPublic: true
  });

  useEffect(() => {
    fetchUserVideos();
  }, []);

  const fetchUserVideos = async () => {
    try {
      setLoading(true);
      const response = await videoAPI.getUserVideos();
      if (response.data.success) {
        setVideos(response.data.data.videos);
      }
    } catch (error) {
      setError('Failed to load videos');
      console.error('Error fetching user videos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (video) => {
    setEditingVideo(video._id);
    setEditForm({
      title: video.title,
      description: video.description,
      category: video.category,
      tags: video.tags.join(', '),
      isPublic: video.isPublic
    });
  };

  const handleCancelEdit = () => {
    setEditingVideo(null);
    setEditForm({
      title: '',
      description: '',
      category: '',
      tags: '',
      isPublic: true
    });
  };

  const handleSaveEdit = async (videoId) => {
    try {
      const response = await videoAPI.updateVideo(videoId, editForm);
      if (response.data.success) {
        // Update the video in the list
        setVideos(videos.map(video => 
          video._id === videoId ? response.data.data.video : video
        ));
        setEditingVideo(null);
      }
    } catch (error) {
      setError('Failed to update video');
      console.error('Error updating video:', error);
    }
  };

  const handleDelete = async (videoId) => {
    if (!window.confirm('Are you sure you want to delete this video? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await videoAPI.deleteVideo(videoId);
      if (response.data.success) {
        setVideos(videos.filter(video => video._id !== videoId));
      }
    } catch (error) {
      setError('Failed to delete video');
      console.error('Error deleting video:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatViews = (views) => {
    if (views >= 1000000) {
      return (views / 1000000).toFixed(1) + 'M';
    }
    if (views >= 1000) {
      return (views / 1000).toFixed(1) + 'K';
    }
    return views.toString();
  };

  if (loading) {
    return (
      <div className="video-management">
        <div className="management-header">
          <h2>Your Videos</h2>
          <p>Loading your uploaded videos...</p>
        </div>
        <div className="loading-grid">
          {[1, 2, 3].map(i => (
            <div key={i} className="video-card-skeleton">
              <div className="skeleton-thumbnail"></div>
              <div className="skeleton-content">
                <div className="skeleton-title"></div>
                <div className="skeleton-text"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="video-management">
      <div className="management-header">
        <h2>Your Videos</h2>
        <p>Manage your uploaded content</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      {videos.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M14,6L10.25,8L14,10M16.97,5H7.03C6.76,5 6.54,5.05 6.37,5.16L5.5,5.5V10.5L6.37,10.84C6.54,10.95 6.76,11 7.03,11H16.97C17.24,11 17.46,10.95 17.63,10.84L18.5,10.5V5.5L17.63,5.16C17.46,5.05 17.24,5 16.97,5Z" />
            </svg>
          </div>
          <h3>No videos uploaded yet</h3>
          <p>Start by uploading your first video!</p>
        </div>
      ) : (
        <div className="videos-grid">
          {videos.map(video => (
            <div key={video._id} className="video-management-card">
              <div className="video-thumbnail">
                <img 
                  src={getFileUrl(video.thumbnailUrl)} 
                  alt={video.title}
                  onError={(e) => {
                    e.target.src = '/placeholder-thumbnail.jpg';
                  }}
                />
                <div className="video-status">
                  {video.isPublic ? (
                    <span className="status-public">Public</span>
                  ) : (
                    <span className="status-private">Private</span>
                  )}
                </div>
              </div>

              <div className="video-info">
                {editingVideo === video._id ? (
                  <div className="edit-form">
                    <input
                      type="text"
                      value={editForm.title}
                      onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                      placeholder="Video title"
                      maxLength="100"
                    />
                    <textarea
                      value={editForm.description}
                      onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                      placeholder="Video description"
                      rows="3"
                      maxLength="5000"
                    />
                    <div className="edit-actions">
                      <button 
                        onClick={() => handleSaveEdit(video._id)}
                        className="save-button"
                      >
                        Save
                      </button>
                      <button 
                        onClick={handleCancelEdit}
                        className="cancel-button"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h3>{video.title}</h3>
                    <p className="video-description">{video.description}</p>
                    <div className="video-meta">
                      <span>{formatViews(video.views)} views</span>
                      <span>•</span>
                      <span>{formatDate(video.createdAt)}</span>
                      <span>•</span>
                      <span>{video.category}</span>
                    </div>
                    <div className="video-actions">
                      <button 
                        onClick={() => handleEdit(video)}
                        className="edit-button"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(video._id)}
                        className="delete-button"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoManagement;
