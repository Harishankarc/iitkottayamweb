import Tender from '../models/Tender.js';
import { Op } from 'sequelize';

// @desc    Get all tenders
// @route   GET /api/tenders
// @access  Public
export const getAllTenders = async (req, res, next) => {
  try {
    const { status, category, search, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    const where = { isPublished: true };
    
    if (status) {
      where.status = status;
    }
    
    if (category) {
      where.category = category;
    }
    
    if (search) {
      where[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { tenderNumber: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } }
      ];
    }

    const tenders = await Tender.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['publishDate', 'DESC']]
    });

    res.json({
      success: true,
      count: tenders.count,
      data: tenders.rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(tenders.count / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get live tenders
// @route   GET /api/tenders/live
// @access  Public
export const getLiveTenders = async (req, res, next) => {
  try {
    const tenders = await Tender.findAll({
      where: {
        status: 'live',
        isPublished: true,
        closingDate: { [Op.gte]: new Date() }
      },
      order: [['closingDate', 'ASC']]
    });

    res.json({
      success: true,
      count: tenders.length,
      data: tenders
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single tender
// @route   GET /api/tenders/:id
// @access  Public
export const getTender = async (req, res, next) => {
  try {
    const tender = await Tender.findByPk(req.params.id);

    if (!tender) {
      return res.status(404).json({
        success: false,
        message: 'Tender not found'
      });
    }

    // Increment view count
    await tender.increment('views');

    res.json({
      success: true,
      data: tender
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create tender
// @route   POST /api/tenders
// @access  Private/Admin
export const createTender = async (req, res, next) => {
  try {
    const tender = await Tender.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Tender created successfully',
      data: tender
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update tender
// @route   PUT /api/tenders/:id
// @access  Private/Admin
export const updateTender = async (req, res, next) => {
  try {
    const tender = await Tender.findByPk(req.params.id);

    if (!tender) {
      return res.status(404).json({
        success: false,
        message: 'Tender not found'
      });
    }

    await tender.update(req.body);

    res.json({
      success: true,
      message: 'Tender updated successfully',
      data: tender
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete tender
// @route   DELETE /api/tenders/:id
// @access  Private/Admin
export const deleteTender = async (req, res, next) => {
  try {
    const tender = await Tender.findByPk(req.params.id);

    if (!tender) {
      return res.status(404).json({
        success: false,
        message: 'Tender not found'
      });
    }

    await tender.destroy();

    res.json({
      success: true,
      message: 'Tender deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update tender status
// @route   PATCH /api/tenders/:id/status
// @access  Private/Admin
export const updateTenderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const tender = await Tender.findByPk(req.params.id);

    if (!tender) {
      return res.status(404).json({
        success: false,
        message: 'Tender not found'
      });
    }

    await tender.update({ status });

    res.json({
      success: true,
      message: `Tender status updated to ${status}`,
      data: tender
    });
  } catch (error) {
    next(error);
  }
};
