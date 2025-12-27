import Announcement from '../models/Announcement.js';
import { Op } from 'sequelize';

// @desc    Get all active announcements
// @route   GET /api/announcements
// @access  Public
export const getAllAnnouncements = async (req, res, next) => {
  try {
    const now = new Date();
    
    const announcements = await Announcement.findAll({
      where: {
        isActive: true,
        startDate: { [Op.lte]: now },
        [Op.or]: [
          { endDate: null },
          { endDate: { [Op.gte]: now } }
        ]
      },
      order: [['priority', 'DESC'], ['startDate', 'DESC']]
    });

    res.json({
      success: true,
      count: announcements.length,
      data: announcements
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single announcement
// @route   GET /api/announcements/:id
// @access  Public
export const getAnnouncementById = async (req, res, next) => {
  try {
    const announcement = await Announcement.findByPk(req.params.id);

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: 'Announcement not found'
      });
    }

    res.json({
      success: true,
      data: announcement
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create announcement
// @route   POST /api/announcements
// @access  Private/Admin
export const createAnnouncement = async (req, res, next) => {
  try {
    const announcement = await Announcement.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Announcement created successfully',
      data: announcement
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update announcement
// @route   PUT /api/announcements/:id
// @access  Private/Admin
export const updateAnnouncement = async (req, res, next) => {
  try {
    const announcement = await Announcement.findByPk(req.params.id);

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: 'Announcement not found'
      });
    }

    await announcement.update(req.body);

    res.json({
      success: true,
      message: 'Announcement updated successfully',
      data: announcement
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete announcement
// @route   DELETE /api/announcements/:id
// @access  Private/Admin
export const deleteAnnouncement = async (req, res, next) => {
  try {
    const announcement = await Announcement.findByPk(req.params.id);

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: 'Announcement not found'
      });
    }

    await announcement.destroy();

    res.json({
      success: true,
      message: 'Announcement deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
