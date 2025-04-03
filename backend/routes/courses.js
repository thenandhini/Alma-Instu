import express from 'express';
import Course from '../models/Course.js';
import Role from '../models/Role.js'; // Import the Role model
import auth from '../middleware/auth.js';

const router = express.Router();

// Get courses (with optional role filter)
router.get('/', async (req, res) => {
  try {
    const { role } = req.query;
    
    let courses;
    if (role) {
      // Find courses associated with the role
      const roleObj = await Role.findOne({ name: role }).populate('courses');
      courses = roleObj ? roleObj.courses : [];
    } else {
      courses = await Course.find();
    }
    
    res.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get course by ID
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('roles', 'name');
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    res.json(course);
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new course (admin or teacher only)
router.post('/', auth, async (req, res) => {
  try {
    // Check if user is admin or teacher (in a real app)
    // const user = await User.findById(req.userId);
    // if (user.role !== 'admin' && user.role !== 'teacher') {
    //   return res.status(403).json({ message: 'Not authorized' });
    // }
    
    const { name, description, resources, roles } = req.body;
    
    const course = new Course({
      name,
      description,
      resources,
      roles
    });
    
    await course.save();
    
    res.status(201).json(course);
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;