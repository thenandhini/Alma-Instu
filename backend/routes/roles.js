import express from 'express';
import Role from '../models/Role.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get all roles
router.get('/', async (req, res) => {
  try {
    const roles = await Role.find().select('name');
    res.json(roles);
  } catch (error) {
    console.error('Error fetching roles:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get role by name
router.get('/:name', async (req, res) => {
  try {
    const role = await Role.findOne({ name: req.params.name })
      .populate('courses')
      .populate('companies');
    
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }
    
    res.json(role);
  } catch (error) {
    console.error('Error fetching role:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new role (admin only)
router.post('/', auth, async (req, res) => {
  try {
    // Check if user is admin (in a real app)
    // const user = await User.findById(req.userId);
    // if (user.role !== 'admin') {
    //   return res.status(403).json({ message: 'Not authorized' });
    // }
    
    const { name, description, skills, courses, companies } = req.body;
    
    // Check if role already exists
    const existingRole = await Role.findOne({ name });
    if (existingRole) {
      return res.status(400).json({ message: 'Role already exists' });
    }
    
    const role = new Role({
      name,
      description,
      skills,
      courses,
      companies
    });
    
    await role.save();
    
    res.status(201).json(role);
  } catch (error) {
    console.error('Error creating role:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;