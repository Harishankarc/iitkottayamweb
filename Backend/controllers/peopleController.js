import People from '../models/People.js';

// Get all people by type
export const getPeopleByType = async (req, res) => {
  try {
    const { type } = req.params;
    const people = await People.findAll({
      where: { userType: type },
      order: [['createdAt', 'DESC']]
    });
    res.json({ success: true, data: people });
  } catch (error) {
    console.error('Error fetching people:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get all people
export const getAllPeople = async (req, res) => {
  try {
    const people = await People.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json({ success: true, data: people });
  } catch (error) {
    console.error('Error fetching people:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get single person
export const getPerson = async (req, res) => {
  try {
    const person = await People.findByPk(req.params.id);
    if (!person) {
      return res.status(404).json({ success: false, message: 'Person not found' });
    }
    res.json({ success: true, data: person });
  } catch (error) {
    console.error('Error fetching person:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Create new person
export const createPerson = async (req, res) => {
  try {
    const person = await People.create(req.body);
    res.status(201).json({ success: true, data: person });
  } catch (error) {
    console.error('Error creating person:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Update person
export const updatePerson = async (req, res) => {
  try {
    const person = await People.findByPk(req.params.id);
    if (!person) {
      return res.status(404).json({ success: false, message: 'Person not found' });
    }
    await person.update(req.body);
    res.json({ success: true, data: person });
  } catch (error) {
    console.error('Error updating person:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Delete person
export const deletePerson = async (req, res) => {
  try {
    const person = await People.findByPk(req.params.id);
    if (!person) {
      return res.status(404).json({ success: false, message: 'Person not found' });
    }
    await person.destroy();
    res.json({ success: true, message: 'Person deleted successfully' });
  } catch (error) {
    console.error('Error deleting person:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
