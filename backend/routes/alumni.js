import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Get alumni (with batch and department filters)
router.get('/', async (req, res) => {
  try {
    const { batch, department } = req.query;
    
    let query = { role: 'alumni' };
    
    if (batch) {
      query.graduationYear = batch;
    }
    
    if (department) {
      query.department = department;
    }
    
    const alumni = await User.find(query)
      .select('firstName lastName company jobTitle linkedin')
      .sort('firstName');
    
    // Format alumni for client
    const formattedAlumni = alumni.map((alumnus, index) => ({
      id: alumnus._id,
      name: `${alumnus.firstName} ${alumnus.lastName}`,
      company: alumnus.company || 'Not specified',
      role: alumnus.jobTitle || 'Not specified',
      linkedin: alumnus.linkedin || '#'
    }));
    
    res.json(formattedAlumni);
  } catch (error) {
    console.error('Error fetching alumni:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;