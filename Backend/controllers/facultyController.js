import Faculty from '../models/Faculty.js';

// @desc    Get all faculty
// @route   GET /api/faculty
// @access  Public
export const getAllFaculty = async (req, res, next) => {
  try {
    const { department } = req.query;
    
    const where = { isActive: true };
    if (department) {
      where.department = department;
    }

    const faculty = await Faculty.findAll({
      where,
      order: [['name', 'ASC']]
    });

    res.json({
      success: true,
      count: faculty.length,
      data: faculty
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single faculty
// @route   GET /api/faculty/:id
// @access  Public
export const getFacultyById = async (req, res, next) => {
  try {
    const faculty = await Faculty.findByPk(req.params.id);

    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: 'Faculty not found'
      });
    }

    res.json({
      success: true,
      data: faculty
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create faculty
// @route   POST /api/faculty
// @access  Private/Admin
export const createFaculty = async (req, res, next) => {
  try {
    const faculty = await Faculty.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Faculty created successfully',
      data: faculty
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update faculty
// @route   PUT /api/faculty/:id
// @access  Private/Admin
export const updateFaculty = async (req, res, next) => {
  try {
    const faculty = await Faculty.findByPk(req.params.id);

    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: 'Faculty not found'
      });
    }

    await faculty.update(req.body);

    res.json({
      success: true,
      message: 'Faculty updated successfully',
      data: faculty
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete faculty
// @route   DELETE /api/faculty/:id
// @access  Private/Admin
export const deleteFaculty = async (req, res, next) => {
  try {
    const faculty = await Faculty.findByPk(req.params.id);

    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: 'Faculty not found'
      });
    }

    await faculty.destroy();

    res.json({
      success: true,
      message: 'Faculty deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
