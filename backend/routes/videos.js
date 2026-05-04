const express = require('express');
const { body } = require('express-validator');
const {
  uploadVideo,
  getAllVideos,
  getVideoById,
  getUserVideos,
  updateVideo,
  deleteVideo,
  getVideoStats
} = require('../controllers/videoController');
const { authMiddleware, optionalAuth } = require('../middleware/auth');
const { uploadVideoWithThumbnail } = require('../config/multer');

const router = express.Router();

// Validation rules
const videoValidation = [
  body('title')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Title is required and must not exceed 100 characters'),
  body('description')
    .trim()
    .isLength({ min: 1, max: 5000 })
    .withMessage('Description is required and must not exceed 5000 characters'),
  body('category')
    .optional()
    .isIn(['Entertainment', 'Education', 'Music', 'Gaming', 'Sports', 'Technology', 'News', 'Comedy', 'Science', 'Other'])
    .withMessage('Invalid category'),
  body('tags')
    .optional()
    .custom((value) => {
      if (value && value.split(',').length > 10) {
        throw new Error('Maximum 10 tags allowed');
      }
      return true;
    })
];

const videoUpdateValidation = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Title must not exceed 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ min: 1, max: 5000 })
    .withMessage('Description must not exceed 5000 characters'),
  body('category')
    .optional()
    .isIn(['Entertainment', 'Education', 'Music', 'Gaming', 'Sports', 'Technology', 'News', 'Comedy', 'Science', 'Other'])
    .withMessage('Invalid category'),
  body('tags')
    .optional()
    .custom((value) => {
      if (value && value.split(',').length > 10) {
        throw new Error('Maximum 10 tags allowed');
      }
      return true;
    })
];

// Routes
router.post('/upload', 
  authMiddleware, 
  uploadVideoWithThumbnail.fields([
    { name: 'video', maxCount: 1 },
    { name: 'thumbnail', maxCount: 1 }
  ]), 
  videoValidation, 
  uploadVideo
);

router.get('/', optionalAuth, getAllVideos);
router.get('/my-videos', authMiddleware, getUserVideos);
router.get('/stats', authMiddleware, getVideoStats);
router.get('/:id', optionalAuth, getVideoById);
router.put('/:id', authMiddleware, videoUpdateValidation, updateVideo);
router.delete('/:id', authMiddleware, deleteVideo);

module.exports = router;
