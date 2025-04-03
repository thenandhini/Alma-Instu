import express from 'express';

const router = express.Router();

// Get all departments
router.get('/', async (req, res) => {
  try {
    // In a real app, this would come from the database
    const departments = [
      { id: 1, name: 'Industrial and Production Engineering' },
      { id: 2, name: 'Computer Science Engineering' },
      { id: 3, name: 'Mechanical Engineering' },
      { id: 4, name: 'Electrical Engineering' },
      { id: 5, name: 'Civil Engineering' }
    ];
    
    res.json(departments);
  } catch (error) {
    console.error('Error fetching departments:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;