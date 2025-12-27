import Gallery from '../models/Gallery.js';

// @desc    Get all gallery events
// @route   GET /api/gallery
// @access  Public
export const getAllGallery = async (req, res, next) => {
  try {
    const { category, featured } = req.query;
    
    const where = { isPublished: true };
    if (category) where.category = category;
    if (featured === 'true') where.isFeatured = true;

    const gallery = await Gallery.findAll({
      where,
      order: [['eventDate', 'DESC']]
    });

    res.json({
      success: true,
      count: gallery.length,
      data: gallery
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single gallery event
// @route   GET /api/gallery/:id
// @access  Public
export const getGalleryById = async (req, res, next) => {
  try {
    const gallery = await Gallery.findByPk(req.params.id);

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: 'Gallery event not found'
      });
    }

    res.json({
      success: true,
      data: gallery
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create gallery event
// @route   POST /api/gallery
// @access  Private/Admin
export const createGallery = async (req, res, next) => {
  try {
    const gallery = await Gallery.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Gallery event created successfully',
      data: gallery
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update gallery event
// @route   PUT /api/gallery/:id
// @access  Private/Admin
export const updateGallery = async (req, res, next) => {
  try {
    const gallery = await Gallery.findByPk(req.params.id);

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: 'Gallery event not found'
      });
    }

    await gallery.update(req.body);

    res.json({
      success: true,
      message: 'Gallery event updated successfully',
      data: gallery
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete gallery event
// @route   DELETE /api/gallery/:id
// @access  Private/Admin
export const deleteGallery = async (req, res, next) => {
  try {
    const gallery = await Gallery.findByPk(req.params.id);

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: 'Gallery event not found'
      });
    }

    await gallery.destroy();

    res.json({
      success: true,
      message: 'Gallery event deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
