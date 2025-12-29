import Footer from '../models/Footer.js';

// @desc    Get all footer items
// @route   GET /api/footer
// @access  Public
export const getFooterItems = async (req, res, next) => {
  try {
    const footerItems = await Footer.findAll({
      where: { isActive: true },
      order: [['section', 'ASC'], ['displayOrder', 'ASC']]
    });

    res.json({
      success: true,
      count: footerItems.length,
      data: footerItems
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single footer item
// @route   GET /api/footer/:id
// @access  Public
export const getFooterItem = async (req, res, next) => {
  try {
    const footerItem = await Footer.findByPk(req.params.id);

    if (!footerItem) {
      return res.status(404).json({
        success: false,
        message: 'Footer item not found'
      });
    }

    res.json({
      success: true,
      data: footerItem
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create footer item
// @route   POST /api/footer
// @access  Private/Admin
export const createFooterItem = async (req, res, next) => {
  try {
    const footerItem = await Footer.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Footer item created successfully',
      data: footerItem
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update footer item
// @route   PUT /api/footer/:id
// @access  Private/Admin
export const updateFooterItem = async (req, res, next) => {
  try {
    const footerItem = await Footer.findByPk(req.params.id);

    if (!footerItem) {
      return res.status(404).json({
        success: false,
        message: 'Footer item not found'
      });
    }

    await footerItem.update(req.body);

    res.json({
      success: true,
      message: 'Footer item updated successfully',
      data: footerItem
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete footer item
// @route   DELETE /api/footer/:id
// @access  Private/Admin
export const deleteFooterItem = async (req, res, next) => {
  try {
    const footerItem = await Footer.findByPk(req.params.id);

    if (!footerItem) {
      return res.status(404).json({
        success: false,
        message: 'Footer item not found'
      });
    }

    await footerItem.destroy();

    res.json({
      success: true,
      message: 'Footer item deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
