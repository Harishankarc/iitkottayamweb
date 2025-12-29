import SiteSettings from '../models/SiteSettings.js';

// @desc    Get all site settings
// @route   GET /api/site-settings
// @access  Public
export const getSiteSettings = async (req, res, next) => {
  try {
    const { category } = req.query;
    const where = {};

    if (category) where.category = category;

    const settings = await SiteSettings.findAll({
      where,
      order: [['category', 'ASC'], ['settingKey', 'ASC']]
    });

    // Convert to key-value object for easier frontend consumption
    const settingsObject = settings.reduce((acc, setting) => {
      acc[setting.settingKey] = {
        value: setting.settingValue,
        type: setting.settingType
      };
      return acc;
    }, {});

    res.json({
      success: true,
      count: settings.length,
      data: settings,
      settings: settingsObject
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single site setting
// @route   GET /api/site-settings/:key
// @access  Public
export const getSiteSetting = async (req, res, next) => {
  try {
    const setting = await SiteSettings.findOne({
      where: { settingKey: req.params.key }
    });

    if (!setting) {
      return res.status(404).json({
        success: false,
        message: 'Setting not found'
      });
    }

    res.json({
      success: true,
      data: setting
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create or update site setting
// @route   POST /api/site-settings
// @access  Private/Admin
export const upsertSiteSetting = async (req, res, next) => {
  try {
    const { settingKey, settingValue, settingType, category, description } = req.body;

    const [setting, created] = await SiteSettings.upsert({
      settingKey,
      settingValue,
      settingType,
      category,
      description
    }, {
      returning: true
    });

    res.status(created ? 201 : 200).json({
      success: true,
      message: created ? 'Setting created successfully' : 'Setting updated successfully',
      data: setting
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update site setting
// @route   PUT /api/site-settings/:id
// @access  Private/Admin
export const updateSiteSetting = async (req, res, next) => {
  try {
    const setting = await SiteSettings.findByPk(req.params.id);

    if (!setting) {
      return res.status(404).json({
        success: false,
        message: 'Setting not found'
      });
    }

    await setting.update(req.body);

    res.json({
      success: true,
      message: 'Setting updated successfully',
      data: setting
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete site setting
// @route   DELETE /api/site-settings/:id
// @access  Private/Admin
export const deleteSiteSetting = async (req, res, next) => {
  try {
    const setting = await SiteSettings.findByPk(req.params.id);

    if (!setting) {
      return res.status(404).json({
        success: false,
        message: 'Setting not found'
      });
    }

    await setting.destroy();

    res.json({
      success: true,
      message: 'Setting deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
