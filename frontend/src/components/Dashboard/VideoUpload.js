import React, { useState } from 'react';
import { videoAPI } from '../../services/api';

const VideoUpload = ({ onVideoUploaded }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Other',
    tags: '',
    isPublic: true
  });
  const [files, setFiles] = useState({
    video: null,
    thumbnail: null
  });
  const [previews, setPreviews] = useState({
    video: '',
    thumbnail: ''
  });
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const categories = [
    'Entertainment', 'Education', 'Music', 'Gaming', 'Sports', 
    'Technology', 'News', 'Comedy', 'Science', 'Other'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    setError('');
  };

  const handleFileChange = (e) => {
    const { name, files: fileList } = e.target;
    const file = fileList[0];

    if (file) {
      setFiles({
        ...files,
        [name]: file
      });

      // Create preview for thumbnail
      if (name === 'thumbnail') {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreviews({
            ...previews,
            thumbnail: e.target.result
          });
        };
        reader.readAsDataURL(file);
      }

      // Create preview for video
      if (name === 'video') {
        const videoUrl = URL.createObjectURL(file);
        setPreviews({
          ...previews,
          video: videoUrl
        });
      }
    }
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setError('');
    setSuccess('');
    setUploadProgress(0);

    if (!files.video || !files.thumbnail) {
      setError('Please select both video and thumbnail files');
      setUploading(false);
      return;
    }

    try {
      const uploadData = new FormData();
      uploadData.append('title', formData.title);
      uploadData.append('description', formData.description);
      uploadData.append('category', formData.category);
      uploadData.append('tags', formData.tags);
      uploadData.append('isPublic', formData.isPublic);
      uploadData.append('video', files.video);
      uploadData.append('thumbnail', files.thumbnail);

      const response = await videoAPI.uploadVideo(uploadData, (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setUploadProgress(percentCompleted);
      });

      if (response.data.success) {
        setSuccess('Video uploaded successfully!');
        // Reset form
        setFormData({
          title: '',
          description: '',
          category: 'Other',
          tags: '',
          isPublic: true
        });
        setFiles({ video: null, thumbnail: null });
        setPreviews({ video: '', thumbnail: '' });
        
        // Clear file inputs
        const videoInput = document.getElementById('video-file');
        const thumbnailInput = document.getElementById('thumbnail-file');
        if (videoInput) videoInput.value = '';
        if (thumbnailInput) thumbnailInput.value = '';

        if (onVideoUploaded) {
          onVideoUploaded();
        }
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Upload failed';
      setError(message);
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="video-upload">
      <div className="upload-header">
        <h2>Upload New Video</h2>
        <p>Share your content with the world</p>
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <form onSubmit={handleSubmit} className="upload-form">
        <div className="form-section">
          <h3>Video Details</h3>
          
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              placeholder="Enter video title"
              disabled={uploading}
              maxLength="100"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              placeholder="Describe your video"
              disabled={uploading}
              rows="4"
              maxLength="5000"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                disabled={uploading}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="tags">Tags (comma-separated)</label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="gaming, tutorial, fun"
                disabled={uploading}
              />
            </div>
          </div>

          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="isPublic"
                checked={formData.isPublic}
                onChange={handleInputChange}
                disabled={uploading}
              />
              <span className="checkmark"></span>
              Make video public
            </label>
          </div>
        </div>

        <div className="form-section">
          <h3>Files</h3>
          
          <div className="file-upload-section">
            <div className="file-group">
              <label htmlFor="video-file">Video File *</label>
              <input
                type="file"
                id="video-file"
                name="video"
                accept="video/*"
                onChange={handleFileChange}
                required
                disabled={uploading}
              />
              {previews.video && (
                <div className="video-preview">
                  <video controls width="300" height="200">
                    <source src={previews.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}
            </div>

            <div className="file-group">
              <label htmlFor="thumbnail-file">Thumbnail *</label>
              <input
                type="file"
                id="thumbnail-file"
                name="thumbnail"
                accept="image/*"
                onChange={handleFileChange}
                required
                disabled={uploading}
              />
              {previews.thumbnail && (
                <div className="thumbnail-preview">
                  <img src={previews.thumbnail} alt="Thumbnail preview" />
                </div>
              )}
            </div>
          </div>
        </div>

        {uploading && (
          <div className="upload-progress">
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p>Uploading... {uploadProgress}%</p>
          </div>
        )}

        <button 
          type="submit" 
          className="upload-button"
          disabled={uploading || !files.video || !files.thumbnail}
        >
          {uploading ? 'Uploading...' : 'Upload Video'}
        </button>
      </form>
    </div>
  );
};

export default VideoUpload;
