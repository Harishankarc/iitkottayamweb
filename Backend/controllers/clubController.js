import Club from '../models/Club.js';

// Get all clubs
export const getAllClubs = async (req, res) => {
  try {
    const clubs = await Club.findAll({
      where: { isActive: true },
      order: [['displayOrder', 'ASC'], ['name', 'ASC']]
    });
    res.json({ success: true, data: clubs });
  } catch (error) {
    console.error('Error fetching clubs:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get club by slug
export const getClubBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const club = await Club.findOne({ where: { slug } });
    if (!club) {
      return res.status(404).json({ success: false, message: 'Club not found' });
    }
    res.json({ success: true, data: club });
  } catch (error) {
    console.error('Error fetching club:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get clubs by type
export const getClubsByType = async (req, res) => {
  try {
    const { type } = req.params;
    const clubs = await Club.findAll({
      where: { type, isActive: true },
      order: [['displayOrder', 'ASC']]
    });
    res.json({ success: true, data: clubs });
  } catch (error) {
    console.error('Error fetching clubs:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get single club
export const getClub = async (req, res) => {
  try {
    const club = await Club.findByPk(req.params.id);
    if (!club) {
      return res.status(404).json({ success: false, message: 'Club not found' });
    }
    res.json({ success: true, data: club });
  } catch (error) {
    console.error('Error fetching club:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Create new club
export const createClub = async (req, res) => {
  try {
    const club = await Club.create(req.body);
    res.status(201).json({ success: true, data: club });
  } catch (error) {
    console.error('Error creating club:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Update club
export const updateClub = async (req, res) => {
  try {
    const club = await Club.findByPk(req.params.id);
    if (!club) {
      return res.status(404).json({ success: false, message: 'Club not found' });
    }
    await club.update(req.body);
    res.json({ success: true, data: club });
  } catch (error) {
    console.error('Error updating club:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Delete club
export const deleteClub = async (req, res) => {
  try {
    const club = await Club.findByPk(req.params.id);
    if (!club) {
      return res.status(404).json({ success: false, message: 'Club not found' });
    }
    await club.destroy();
    res.json({ success: true, message: 'Club deleted successfully' });
  } catch (error) {
    console.error('Error deleting club:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
