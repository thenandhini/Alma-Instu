import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Get all graduation years (batches)
router.get('/', async (req, res) => {
  try {
    // Find all unique graduation years from alumni
    const users = await User.find({ role: 'alumni' }).distinct('graduationYear');
    
    // Sort years in descending order
    const sortedYears = users.sort((a, b) => b - a);
    
    // Format response
    const batches = sortedYears.map((year, index) => ({
      id: index + 1,
      year
    }));
    
    res.json(batches);
  } catch (error) {
    console.error('Error fetching batches:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;