import Navigation from '../models/Navigation.js';

// @desc    Get all navigation items
// @route   GET /api/navigation
// @access  Public
export const getNavigationItems = async (req, res, next) => {
  try {
    const navigationItems = await Navigation.findAll({
      where: { isActive: true },
      order: [['displayOrder', 'ASC']]
    });

    res.json({
      success: true,
      count: navigationItems.length,
      data: navigationItems
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single navigation item
// @route   GET /api/navigation/:id
// @access  Public
export const getNavigationItem = async (req, res, next) => {
  try {
    const navigationItem = await Navigation.findByPk(req.params.id);

    if (!navigationItem) {
      return res.status(404).json({
        success: false,
        message: 'Navigation item not found'
      });
    }

    res.json({
      success: true,
      data: navigationItem
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create navigation item
// @route   POST /api/navigation
// @access  Private/Admin
export const createNavigationItem = async (req, res, next) => {
  try {
    const navigationItem = await Navigation.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Navigation item created successfully',
      data: navigationItem
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update navigation item
// @route   PUT /api/navigation/:id
// @access  Private/Admin
export const updateNavigationItem = async (req, res, next) => {
  try {
    const navigationItem = await Navigation.findByPk(req.params.id);

    if (!navigationItem) {
      return res.status(404).json({
        success: false,
        message: 'Navigation item not found'
      });
    }

    await navigationItem.update(req.body);

    res.json({
      success: true,
      message: 'Navigation item updated successfully',
      data: navigationItem
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete navigation item
// @route   DELETE /api/navigation/:id
// @access  Private/Admin
export const deleteNavigationItem = async (req, res, next) => {
  try {
    const navigationItem = await Navigation.findByPk(req.params.id);

    if (!navigationItem) {
      return res.status(404).json({
        success: false,
        message: 'Navigation item not found'
      });
    }

    await navigationItem.destroy();

    res.json({
      success: true,
      message: 'Navigation item deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
