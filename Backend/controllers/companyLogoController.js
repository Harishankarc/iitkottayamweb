import CompanyLogo from '../models/CompanyLogo.js';

// @desc    Get all company logos
// @route   GET /api/company-logos
// @access  Public
export const getCompanyLogos = async (req, res, next) => {
  try {
    const { category, featured } = req.query;
    const where = { isActive: true };

    if (category) where.category = category;
    if (featured === 'true') where.isFeatured = true;

    const logos = await CompanyLogo.findAll({
      where,
      order: [['displayOrder', 'ASC'], ['name', 'ASC']]
    });

    res.json({
      success: true,
      count: logos.length,
      data: logos
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single company logo
// @route   GET /api/company-logos/:id
// @access  Public
export const getCompanyLogo = async (req, res, next) => {
  try {
    const logo = await CompanyLogo.findByPk(req.params.id);

    if (!logo) {
      return res.status(404).json({
        success: false,
        message: 'Company logo not found'
      });
    }

    res.json({
      success: true,
      data: logo
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create company logo
// @route   POST /api/company-logos
// @access  Private/Admin
export const createCompanyLogo = async (req, res, next) => {
  try {
    const logo = await CompanyLogo.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Company logo created successfully',
      data: logo
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update company logo
// @route   PUT /api/company-logos/:id
// @access  Private/Admin
export const updateCompanyLogo = async (req, res, next) => {
  try {
    const logo = await CompanyLogo.findByPk(req.params.id);

    if (!logo) {
      return res.status(404).json({
        success: false,
        message: 'Company logo not found'
      });
    }

    await logo.update(req.body);

    res.json({
      success: true,
      message: 'Company logo updated successfully',
      data: logo
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete company logo
// @route   DELETE /api/company-logos/:id
// @access  Private/Admin
export const deleteCompanyLogo = async (req, res, next) => {
  try {
    const logo = await CompanyLogo.findByPk(req.params.id);

    if (!logo) {
      return res.status(404).json({
        success: false,
        message: 'Company logo not found'
      });
    }

    await logo.destroy();

    res.json({
      success: true,
      message: 'Company logo deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
