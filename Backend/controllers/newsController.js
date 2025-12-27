import News from '../models/News.js';
import { Op } from 'sequelize';

// @desc    Get all news
// @route   GET /api/news
// @access  Public
export const getAllNews = async (req, res, next) => {
  try {
    const { category, page = 1, limit = 10 } = req.query;
    
    const where = { isPublished: true };
    if (category) {
      where.category = category;
    }

    const offset = (page - 1) * limit;

    const { count, rows } = await News.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: offset,
      order: [['publishedDate', 'DESC']]
    });

    res.json({
      success: true,
      count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      data: rows
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single news
// @route   GET /api/news/:id
// @access  Public
export const getNewsById = async (req, res, next) => {
  try {
    const news = await News.findByPk(req.params.id);

    if (!news) {
      return res.status(404).json({
        success: false,
        message: 'News not found'
      });
    }

    // Increment views
    news.views += 1;
    await news.save();

    res.json({
      success: true,
      data: news
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create news
// @route   POST /api/news
// @access  Private/Admin
export const createNews = async (req, res, next) => {
  try {
    const news = await News.create(req.body);

    res.status(201).json({
      success: true,
      message: 'News created successfully',
      data: news
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update news
// @route   PUT /api/news/:id
// @access  Private/Admin
export const updateNews = async (req, res, next) => {
  try {
    const news = await News.findByPk(req.params.id);

    if (!news) {
      return res.status(404).json({
        success: false,
        message: 'News not found'
      });
    }

    await news.update(req.body);

    res.json({
      success: true,
      message: 'News updated successfully',
      data: news
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete news
// @route   DELETE /api/news/:id
// @access  Private/Admin
export const deleteNews = async (req, res, next) => {
  try {
    const news = await News.findByPk(req.params.id);

    if (!news) {
      return res.status(404).json({
        success: false,
        message: 'News not found'
      });
    }

    await news.destroy();

    res.json({
      success: true,
      message: 'News deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get news by category
// @route   GET /api/news/category/:category
// @access  Public
export const getNewsByCategory = async (req, res, next) => {
  try {
    const news = await News.findAll({
      where: {
        category: req.params.category,
        isPublished: true
      },
      order: [['publishedDate', 'DESC']],
      limit: 10
    });

    res.json({
      success: true,
      count: news.length,
      data: news
    });
  } catch (error) {
    next(error);
  }
};
