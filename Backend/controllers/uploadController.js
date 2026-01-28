import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// @desc    Upload image
// @route   POST /api/upload
// @access  Private
export const uploadImage = async (req, res, next) => {
  try {
    console.log('Upload request received');
    console.log('File:', req.file);
    console.log('Body:', req.body);
    
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a file'
      });
    }

    // TODO: Implement Cloudinary or AWS S3 upload
    // For now, return local file path
    const fileUrl = `/uploads/${req.file.filename}`;

    console.log('File uploaded successfully:', fileUrl);

    res.json({
      success: true,
      message: 'File uploaded successfully',
      data: {
        url: fileUrl,
        filename: req.file.filename,
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size
      }
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error uploading image',
      error: error.toString()
    });
  }
};

// @desc    Upload multiple images
// @route   POST /api/upload/multiple
// @access  Private
export const uploadMultipleImages = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please upload at least one file'
      });
    }

    const files = req.files.map(file => ({
      url: `/uploads/${file.filename}`,
      filename: file.filename,
      mimetype: file.mimetype,
      size: file.size
    }));

    res.json({
      success: true,
      message: 'Files uploaded successfully',
      data: files
    });
  } catch (error) {
    next(error);
  }
};
