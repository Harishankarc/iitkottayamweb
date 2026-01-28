import FdpProgram from '../models/FdpProgram.js';

// Get all FDP programs
export const getAllFdpPrograms = async (req, res) => {
  try {
    const programs = await FdpProgram.findAll({
      where: { isActive: true },
      order: [['displayOrder', 'ASC'], ['startDate', 'DESC']]
    });
    res.json({ success: true, data: programs });
  } catch (error) {
    console.error('Error fetching FDP programs:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch FDP programs' });
  }
};

// Get single FDP program
export const getFdpProgramById = async (req, res) => {
  try {
    const { id } = req.params;
    const program = await FdpProgram.findByPk(id);
    
    if (!program) {
      return res.status(404).json({ success: false, message: 'FDP program not found' });
    }
    
    res.json({ success: true, data: program });
  } catch (error) {
    console.error('Error fetching FDP program:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch FDP program' });
  }
};

// Create new FDP program
export const createFdpProgram = async (req, res) => {
  try {
    const program = await FdpProgram.create(req.body);
    res.status(201).json({ success: true, data: program });
  } catch (error) {
    console.error('Error creating FDP program:', error);
    res.status(500).json({ success: false, message: 'Failed to create FDP program' });
  }
};

// Update FDP program
export const updateFdpProgram = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await FdpProgram.update(req.body, {
      where: { id }
    });
    
    if (!updated) {
      return res.status(404).json({ success: false, message: 'FDP program not found' });
    }
    
    const program = await FdpProgram.findByPk(id);
    res.json({ success: true, data: program });
  } catch (error) {
    console.error('Error updating FDP program:', error);
    res.status(500).json({ success: false, message: 'Failed to update FDP program' });
  }
};

// Delete FDP program (soft delete)
export const deleteFdpProgram = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await FdpProgram.update(
      { isActive: false },
      { where: { id } }
    );
    
    if (!updated) {
      return res.status(404).json({ success: false, message: 'FDP program not found' });
    }
    
    res.json({ success: true, message: 'FDP program deleted successfully' });
  } catch (error) {
    console.error('Error deleting FDP program:', error);
    res.status(500).json({ success: false, message: 'Failed to delete FDP program' });
  }
};
