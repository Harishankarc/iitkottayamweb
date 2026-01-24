import Facility from '../models/Facility.js';

// Get all facilities
export const getAllFacilities = async (req, res) => {
  try {
    const facilities = await Facility.findAll({
      where: { isActive: true },
      order: [['displayOrder', 'ASC'], ['createdAt', 'DESC']]
    });
    res.json({ success: true, data: facilities });
  } catch (error) {
    console.error('Error fetching facilities:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get facility by slug
export const getFacilityBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const facility = await Facility.findOne({ where: { slug } });
    if (!facility) {
      return res.status(404).json({ success: false, message: 'Facility not found' });
    }
    res.json({ success: true, data: facility });
  } catch (error) {
    console.error('Error fetching facility:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get facilities by type
export const getFacilitiesByType = async (req, res) => {
  try {
    const { type } = req.params;
    const facilities = await Facility.findAll({
      where: { type, isActive: true },
      order: [['displayOrder', 'ASC']]
    });
    res.json({ success: true, data: facilities });
  } catch (error) {
    console.error('Error fetching facilities:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get single facility
export const getFacility = async (req, res) => {
  try {
    const facility = await Facility.findByPk(req.params.id);
    if (!facility) {
      return res.status(404).json({ success: false, message: 'Facility not found' });
    }
    res.json({ success: true, data: facility });
  } catch (error) {
    console.error('Error fetching facility:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Create new facility
export const createFacility = async (req, res) => {
  try {
    const facility = await Facility.create(req.body);
    res.status(201).json({ success: true, data: facility });
  } catch (error) {
    console.error('Error creating facility:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Update facility
export const updateFacility = async (req, res) => {
  try {
    const facility = await Facility.findByPk(req.params.id);
    if (!facility) {
      return res.status(404).json({ success: false, message: 'Facility not found' });
    }
    await facility.update(req.body);
    res.json({ success: true, data: facility });
  } catch (error) {
    console.error('Error updating facility:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Delete facility
export const deleteFacility = async (req, res) => {
  try {
    const facility = await Facility.findByPk(req.params.id);
    if (!facility) {
      return res.status(404).json({ success: false, message: 'Facility not found' });
    }
    await facility.destroy();
    res.json({ success: true, message: 'Facility deleted successfully' });
  } catch (error) {
    console.error('Error deleting facility:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
