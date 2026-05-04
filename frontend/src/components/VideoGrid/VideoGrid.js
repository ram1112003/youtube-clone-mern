import React from 'react';
import VideoCard from '../VideoCard/VideoCard';
import './VideoGrid.css';

const VideoGrid = ({ videos, loading, onVideoSelect, searchQuery }) => {
  if (loading) {
    return (
      <div className="video-grid-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading videos...</p>
        </div>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="video-grid-container">
        <div className="no-results">
          <h2>No videos found</h2>
          {searchQuery && <p>Try different keywords or browse our trending videos.</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="video-grid-container">
      {searchQuery && (
        <div className="search-results-header">
          <h2>Search results for "{searchQuery}"</h2>
          <p>{videos.length} result{videos.length !== 1 ? 's' : ''}</p>
        </div>
      )}
      
      <div className="video-grid">
        {videos.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            onClick={() => onVideoSelect(video)}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoGrid;
