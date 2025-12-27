import HeroSlider from '../models/HeroSlider.js';

// @desc    Get all active hero sliders
// @route   GET /api/hero-sliders
// @access  Public
export const getAllSliders = async (req, res, next) => {
  try {
    const sliders = await HeroSlider.findAll({
      where: { isActive: true },
      order: [['displayOrder', 'ASC']]
    });

    res.json({
      success: true,
      count: sliders.length,
      data: sliders
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single slider
// @route   GET /api/hero-sliders/:id
// @access  Public
export const getSliderById = async (req, res, next) => {
  try {
    const slider = await HeroSlider.findByPk(req.params.id);

    if (!slider) {
      return res.status(404).json({
        success: false,
        message: 'Slider not found'
      });
    }

    res.json({
      success: true,
      data: slider
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create slider
// @route   POST /api/hero-sliders
// @access  Private/Admin
export const createSlider = async (req, res, next) => {
  try {
    const slider = await HeroSlider.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Slider created successfully',
      data: slider
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update slider
// @route   PUT /api/hero-sliders/:id
// @access  Private/Admin
export const updateSlider = async (req, res, next) => {
  try {
    const slider = await HeroSlider.findByPk(req.params.id);

    if (!slider) {
      return res.status(404).json({
        success: false,
        message: 'Slider not found'
      });
    }

    await slider.update(req.body);

    res.json({
      success: true,
      message: 'Slider updated successfully',
      data: slider
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete slider
// @route   DELETE /api/hero-sliders/:id
// @access  Private/Admin
export const deleteSlider = async (req, res, next) => {
  try {
    const slider = await HeroSlider.findByPk(req.params.id);

    if (!slider) {
      return res.status(404).json({
        success: false,
        message: 'Slider not found'
      });
    }

    await slider.destroy();

    res.json({
      success: true,
      message: 'Slider deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
