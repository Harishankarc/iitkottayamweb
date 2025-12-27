import Placement from '../models/Placement.js';

// @desc    Get all placements
// @route   GET /api/placements
// @access  Public
export const getAllPlacements = async (req, res, next) => {
  try {
    const { academicYear } = req.query;
    
    const where = { isPublished: true };
    if (academicYear) {
      where.academicYear = academicYear;
    }

    const placements = await Placement.findAll({
      where,
      order: [['visitDate', 'DESC']]
    });

    res.json({
      success: true,
      count: placements.length,
      data: placements
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single placement
// @route   GET /api/placements/:id
// @access  Public
export const getPlacementById = async (req, res, next) => {
  try {
    const placement = await Placement.findByPk(req.params.id);

    if (!placement) {
      return res.status(404).json({
        success: false,
        message: 'Placement not found'
      });
    }

    res.json({
      success: true,
      data: placement
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create placement
// @route   POST /api/placements
// @access  Private/Admin
export const createPlacement = async (req, res, next) => {
  try {
    const placement = await Placement.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Placement created successfully',
      data: placement
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update placement
// @route   PUT /api/placements/:id
// @access  Private/Admin
export const updatePlacement = async (req, res, next) => {
  try {
    const placement = await Placement.findByPk(req.params.id);

    if (!placement) {
      return res.status(404).json({
        success: false,
        message: 'Placement not found'
      });
    }

    await placement.update(req.body);

    res.json({
      success: true,
      message: 'Placement updated successfully',
      data: placement
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete placement
// @route   DELETE /api/placements/:id
// @access  Private/Admin
export const deletePlacement = async (req, res, next) => {
  try {
    const placement = await Placement.findByPk(req.params.id);

    if (!placement) {
      return res.status(404).json({
        success: false,
        message: 'Placement not found'
      });
    }

    await placement.destroy();

    res.json({
      success: true,
      message: 'Placement deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
