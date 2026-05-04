const { validationResult } = require('express-validator');
const Video = require('../models/Video');
const fs = require('fs');
const path = require('path');

// Upload a new video
const uploadVideo = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    if (!req.files || !req.files.video || !req.files.thumbnail) {
      return res.status(400).json({
        success: false,
        message: 'Both video file and thumbnail are required'
      });
    }

    const { title, description, category, tags, isPublic } = req.body;
    const videoFile = req.files.video[0];
    const thumbnailFile = req.files.thumbnail[0];

    // Create video record
    const video = new Video({
      title,
      description,
      videoUrl: `/uploads/videos/${videoFile.filename}`,
      thumbnailUrl: `/uploads/thumbnails/${thumbnailFile.filename}`,
      originalFileName: videoFile.originalname,
      fileSize: videoFile.size,
      uploadedBy: req.user._id,
      category: category || 'Other',
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      isPublic: isPublic !== 'false' // Default to true unless explicitly set to false
    });

    await video.save();

    // Populate user information
    await video.populate('uploadedBy', 'username firstName lastName avatar');

    res.status(201).json({
      success: true,
      message: 'Video uploaded successfully',
      data: {
        video
      }
    });
  } catch (error) {
    // Clean up uploaded files on error
    if (req.files) {
      if (req.files.video) {
        fs.unlink(req.files.video[0].path, () => {});
      }
      if (req.files.thumbnail) {
        fs.unlink(req.files.thumbnail[0].path, () => {});
      }
    }

    console.error('Video upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get all public videos
const getAllVideos = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const search = req.query.search || '';
    const category = req.query.category || '';

    let query = { isPublic: true, isProcessing: false };

    // Add search functionality
    if (search) {
      query.$text = { $search: search };
    }

    // Add category filter
    if (category && category !== 'All') {
      query.category = category;
    }

    const videos = await Video.find(query)
      .populate('uploadedBy', 'username firstName lastName avatar')
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);

    const totalVideos = await Video.countDocuments(query);

    res.json({
      success: true,
      data: {
        videos,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalVideos / limit),
          totalVideos,
          hasNextPage: page < Math.ceil(totalVideos / limit),
          hasPrevPage: page > 1
        }
      }
    });
  } catch (error) {
    console.error('Get all videos error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get video by ID
const getVideoById = async (req, res) => {
  try {
    const { id } = req.params;

    const video = await Video.findById(id)
      .populate('uploadedBy', 'username firstName lastName avatar channelDescription subscriberCount');

    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video not found'
      });
    }

    // Only show private videos to the owner
    if (!video.isPublic && (!req.user || video.uploadedBy._id.toString() !== req.user._id.toString())) {
      return res.status(403).json({
        success: false,
        message: 'Access denied to private video'
      });
    }

    // Increment view count if not the owner viewing their own video
    if (!req.user || video.uploadedBy._id.toString() !== req.user._id.toString()) {
      await video.incrementViews();
    }

    res.json({
      success: true,
      data: {
        video
      }
    });
  } catch (error) {
    console.error('Get video by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get user's videos
const getUserVideos = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const videos = await Video.find({ uploadedBy: req.user._id })
      .populate('uploadedBy', 'username firstName lastName avatar')
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);

    const totalVideos = await Video.countDocuments({ uploadedBy: req.user._id });

    res.json({
      success: true,
      data: {
        videos,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalVideos / limit),
          totalVideos,
          hasNextPage: page < Math.ceil(totalVideos / limit),
          hasPrevPage: page > 1
        }
      }
    });
  } catch (error) {
    console.error('Get user videos error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Update video
const updateVideo = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { id } = req.params;
    const { title, description, category, tags, isPublic } = req.body;

    const video = await Video.findById(id);

    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video not found'
      });
    }

    // Check if user owns the video
    if (video.uploadedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You can only update your own videos.'
      });
    }

    // Update video
    video.title = title || video.title;
    video.description = description || video.description;
    video.category = category || video.category;
    video.tags = tags ? tags.split(',').map(tag => tag.trim()) : video.tags;
    video.isPublic = isPublic !== undefined ? isPublic === 'true' : video.isPublic;

    await video.save();
    await video.populate('uploadedBy', 'username firstName lastName avatar');

    res.json({
      success: true,
      message: 'Video updated successfully',
      data: {
        video
      }
    });
  } catch (error) {
    console.error('Update video error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Delete video
const deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;

    const video = await Video.findById(id);

    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video not found'
      });
    }

    // Check if user owns the video
    if (video.uploadedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You can only delete your own videos.'
      });
    }

    // Delete files from filesystem
    const videoPath = path.join(__dirname, '..', video.videoUrl);
    const thumbnailPath = path.join(__dirname, '..', video.thumbnailUrl);

    fs.unlink(videoPath, (err) => {
      if (err) console.error('Error deleting video file:', err);
    });

    fs.unlink(thumbnailPath, (err) => {
      if (err) console.error('Error deleting thumbnail file:', err);
    });

    // Delete video record
    await Video.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Video deleted successfully'
    });
  } catch (error) {
    console.error('Delete video error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get video statistics for dashboard
const getVideoStats = async (req, res) => {
  try {
    const userId = req.user._id;

    const stats = await Video.aggregate([
      { $match: { uploadedBy: userId } },
      {
        $group: {
          _id: null,
          totalVideos: { $sum: 1 },
          totalViews: { $sum: '$views' },
          totalLikes: { $sum: '$likes' },
          avgViews: { $avg: '$views' }
        }
      }
    ]);

    const result = stats[0] || {
      totalVideos: 0,
      totalViews: 0,
      totalLikes: 0,
      avgViews: 0
    };

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Get video stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

module.exports = {
  uploadVideo,
  getAllVideos,
  getVideoById,
  getUserVideos,
  updateVideo,
  deleteVideo,
  getVideoStats
};
