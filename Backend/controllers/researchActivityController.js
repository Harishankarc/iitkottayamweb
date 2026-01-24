import ResearchActivity from '../models/ResearchActivity.js';
import { Op } from 'sequelize';

// Get all research activities
export const getAllActivities = async (req, res) => {
  try {
    const { type, year } = req.query;
    const where = { isPublished: true };
    
    if (type) {
      where.activityType = type;
    }
    
    if (year) {
      where.activityDate = {
        [Op.gte]: `${year}-01-01`,
        [Op.lte]: `${year}-12-31`
      };
    }
    
    const activities = await ResearchActivity.findAll({
      where,
      order: [['activityDate', 'DESC'], ['serialNumber', 'ASC']]
    });
    res.json({ success: true, data: activities });
  } catch (error) {
    console.error('Error fetching research activities:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get activities by type
export const getActivitiesByType = async (req, res) => {
  try {
    const { type } = req.params;
    const activities = await ResearchActivity.findAll({
      where: { activityType: type, isPublished: true },
      order: [['activityDate', 'DESC']]
    });
    res.json({ success: true, data: activities });
  } catch (error) {
    console.error('Error fetching research activities:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get single research activity
export const getActivity = async (req, res) => {
  try {
    const activity = await ResearchActivity.findByPk(req.params.id);
    if (!activity) {
      return res.status(404).json({ success: false, message: 'Research activity not found' });
    }
    res.json({ success: true, data: activity });
  } catch (error) {
    console.error('Error fetching research activity:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Create new research activity
export const createActivity = async (req, res) => {
  try {
    const activity = await ResearchActivity.create(req.body);
    res.status(201).json({ success: true, data: activity });
  } catch (error) {
    console.error('Error creating research activity:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Update research activity
export const updateActivity = async (req, res) => {
  try {
    const activity = await ResearchActivity.findByPk(req.params.id);
    if (!activity) {
      return res.status(404).json({ success: false, message: 'Research activity not found' });
    }
    await activity.update(req.body);
    res.json({ success: true, data: activity });
  } catch (error) {
    console.error('Error updating research activity:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Delete research activity
export const deleteActivity = async (req, res) => {
  try {
    const activity = await ResearchActivity.findByPk(req.params.id);
    if (!activity) {
      return res.status(404).json({ success: false, message: 'Research activity not found' });
    }
    await activity.destroy();
    res.json({ success: true, message: 'Research activity deleted successfully' });
  } catch (error) {
    console.error('Error deleting research activity:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
