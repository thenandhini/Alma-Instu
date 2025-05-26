import express from 'express';

const router = express.Router();

// Get all departments
router.get('/', async (req, res) => {
  try {
    const batches = [
      { id: 1, year: '2023' },
      { id: 2, year: '2022' },
      { id: 3, year: '2021' },
      { id: 4, year: '2020' },
    ];
    
    res.json(batches);
  } catch (error) {
    console.error('Error fetching departments:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;