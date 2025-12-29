import Contact from '../models/Contact.js';

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
export const submitContact = async (req, res, next) => {
  try {
    const { name, email, phone, subject, message, category } = req.body;

    // Get IP address
    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    const contact = await Contact.create({
      name,
      email,
      phone,
      subject,
      message,
      category,
      ipAddress
    });

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully. We will get back to you soon.',
      data: contact
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all contact submissions
// @route   GET /api/contact
// @access  Private/Admin
export const getAllContacts = async (req, res, next) => {
  try {
    const { status, category, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    const where = {};
    if (status) where.status = status;
    if (category) where.category = category;

    const contacts = await Contact.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      count: contacts.count,
      data: contacts.rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(contacts.count / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single contact
// @route   GET /api/contact/:id
// @access  Private/Admin
export const getContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByPk(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.json({
      success: true,
      data: contact
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update contact status
// @route   PUT /api/contact/:id
// @access  Private/Admin
export const updateContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByPk(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    await contact.update(req.body);

    res.json({
      success: true,
      message: 'Contact updated successfully',
      data: contact
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete contact
// @route   DELETE /api/contact/:id
// @access  Private/Admin
export const deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByPk(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    await contact.destroy();

    res.json({
      success: true,
      message: 'Contact deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
