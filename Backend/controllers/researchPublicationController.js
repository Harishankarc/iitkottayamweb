import ResearchPublication from '../models/ResearchPublication.js';
import { Op } from 'sequelize';

// @desc    Get all research publications
// @route   GET /api/research-publications
// @access  Public
export const getAllPublications = async (req, res, next) => {
  try {
    const { type, year, department, featured } = req.query;
    
    const where = { isPublished: true };
    if (type) where.publicationType = type;
    if (year) where.year = parseInt(year);
    if (department) where.department = department;
    if (featured === 'true') where.isFeatured = true;

    const publications = await ResearchPublication.findAll({
      where,
      order: [['year', 'DESC'], ['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      count: publications.length,
      data: publications
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single publication
// @route   GET /api/research-publications/:id
// @access  Public
export const getPublicationById = async (req, res, next) => {
  try {
    const publication = await ResearchPublication.findByPk(req.params.id);

    if (!publication) {
      return res.status(404).json({
        success: false,
        message: 'Publication not found'
      });
    }

    res.json({
      success: true,
      data: publication
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create publication
// @route   POST /api/research-publications
// @access  Private/Admin
export const createPublication = async (req, res, next) => {
  try {
    const publication = await ResearchPublication.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Publication created successfully',
      data: publication
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update publication
// @route   PUT /api/research-publications/:id
// @access  Private/Admin
export const updatePublication = async (req, res, next) => {
  try {
    const publication = await ResearchPublication.findByPk(req.params.id);

    if (!publication) {
      return res.status(404).json({
        success: false,
        message: 'Publication not found'
      });
    }

    await publication.update(req.body);

    res.json({
      success: true,
      message: 'Publication updated successfully',
      data: publication
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete publication
// @route   DELETE /api/research-publications/:id
// @access  Private/Admin
export const deletePublication = async (req, res, next) => {
  try {
    const publication = await ResearchPublication.findByPk(req.params.id);

    if (!publication) {
      return res.status(404).json({
        success: false,
        message: 'Publication not found'
      });
    }

    await publication.destroy();

    res.json({
      success: true,
      message: 'Publication deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
