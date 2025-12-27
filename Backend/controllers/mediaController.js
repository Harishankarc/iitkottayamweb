import Media from '../models/Media.js';

// @desc    Get all media
// @route   GET /api/media
// @access  Public
export const getAllMedia = async (req, res, next) => {
  try {
    const { type, featured } = req.query;
    
    const where = { isPublished: true };
    if (type) where.type = type;
    if (featured === 'true') where.isFeatured = true;

    const media = await Media.findAll({
      where,
      order: [['publishDate', 'DESC']]
    });

    res.json({
      success: true,
      count: media.length,
      data: media
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single media
// @route   GET /api/media/:id
// @access  Public
export const getMediaById = async (req, res, next) => {
  try {
    const media = await Media.findByPk(req.params.id);

    if (!media) {
      return res.status(404).json({
        success: false,
        message: 'Media not found'
      });
    }

    res.json({
      success: true,
      data: media
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create media
// @route   POST /api/media
// @access  Private/Admin
export const createMedia = async (req, res, next) => {
  try {
    const media = await Media.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Media created successfully',
      data: media
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update media
// @route   PUT /api/media/:id
// @access  Private/Admin
export const updateMedia = async (req, res, next) => {
  try {
    const media = await Media.findByPk(req.params.id);

    if (!media) {
      return res.status(404).json({
        success: false,
        message: 'Media not found'
      });
    }

    await media.update(req.body);

    res.json({
      success: true,
      message: 'Media updated successfully',
      data: media
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete media
// @route   DELETE /api/media/:id
// @access  Private/Admin
export const deleteMedia = async (req, res, next) => {
  try {
    const media = await Media.findByPk(req.params.id);

    if (!media) {
      return res.status(404).json({
        success: false,
        message: 'Media not found'
      });
    }

    await media.destroy();

    res.json({
      success: true,
      message: 'Media deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
