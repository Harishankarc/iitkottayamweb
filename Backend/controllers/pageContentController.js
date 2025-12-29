import PageContent from '../models/PageContent.js';

// @desc    Get all pages
// @route   GET /api/pages
// @access  Public
export const getAllPages = async (req, res, next) => {
  try {
    const { category, isPublished } = req.query;
    
    const where = {};
    if (category) where.category = category;
    if (isPublished !== undefined) where.isPublished = isPublished === 'true';
    else where.isPublished = true; // Default to published only

    const pages = await PageContent.findAll({
      where,
      order: [['sortOrder', 'ASC'], ['pageName', 'ASC']]
    });

    res.json({
      success: true,
      count: pages.length,
      data: pages
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single page by name
// @route   GET /api/pages/:pageName
// @access  Public
export const getPageByName = async (req, res, next) => {
  try {
    const page = await PageContent.findOne({
      where: { pageName: req.params.pageName }
    });

    if (!page) {
      return res.status(404).json({
        success: false,
        message: 'Page not found'
      });
    }

    res.json({
      success: true,
      data: page
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create page
// @route   POST /api/pages
// @access  Private/Admin
export const createPage = async (req, res, next) => {
  try {
    const page = await PageContent.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Page created successfully',
      data: page
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update page
// @route   PUT /api/pages/:id
// @access  Private/Admin
export const updatePage = async (req, res, next) => {
  try {
    const page = await PageContent.findByPk(req.params.id);

    if (!page) {
      return res.status(404).json({
        success: false,
        message: 'Page not found'
      });
    }

    await page.update(req.body);

    res.json({
      success: true,
      message: 'Page updated successfully',
      data: page
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete page
// @route   DELETE /api/pages/:id
// @access  Private/Admin
export const deletePage = async (req, res, next) => {
  try {
    const page = await PageContent.findByPk(req.params.id);

    if (!page) {
      return res.status(404).json({
        success: false,
        message: 'Page not found'
      });
    }

    await page.destroy();

    res.json({
      success: true,
      message: 'Page deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
