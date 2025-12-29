import NIRF from '../models/NIRF.js';

// @desc    Get all NIRF rankings
// @route   GET /api/nirf
// @access  Public
export const getNIRFRankings = async (req, res, next) => {
  try {
    const { year } = req.query;
    const where = { isPublished: true };

    if (year) where.year = year;

    const rankings = await NIRF.findAll({
      where,
      order: [['year', 'DESC'], ['rank', 'ASC']]
    });

    res.json({
      success: true,
      count: rankings.length,
      data: rankings
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single NIRF ranking
// @route   GET /api/nirf/:id
// @access  Public
export const getNIRFRanking = async (req, res, next) => {
  try {
    const ranking = await NIRF.findByPk(req.params.id);

    if (!ranking) {
      return res.status(404).json({
        success: false,
        message: 'NIRF ranking not found'
      });
    }

    res.json({
      success: true,
      data: ranking
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create NIRF ranking
// @route   POST /api/nirf
// @access  Private/Admin
export const createNIRFRanking = async (req, res, next) => {
  try {
    const ranking = await NIRF.create(req.body);

    res.status(201).json({
      success: true,
      message: 'NIRF ranking created successfully',
      data: ranking
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update NIRF ranking
// @route   PUT /api/nirf/:id
// @access  Private/Admin
export const updateNIRFRanking = async (req, res, next) => {
  try {
    const ranking = await NIRF.findByPk(req.params.id);

    if (!ranking) {
      return res.status(404).json({
        success: false,
        message: 'NIRF ranking not found'
      });
    }

    await ranking.update(req.body);

    res.json({
      success: true,
      message: 'NIRF ranking updated successfully',
      data: ranking
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete NIRF ranking
// @route   DELETE /api/nirf/:id
// @access  Private/Admin
export const deleteNIRFRanking = async (req, res, next) => {
  try {
    const ranking = await NIRF.findByPk(req.params.id);

    if (!ranking) {
      return res.status(404).json({
        success: false,
        message: 'NIRF ranking not found'
      });
    }

    await ranking.destroy();

    res.json({
      success: true,
      message: 'NIRF ranking deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
