import express from 'express';
import Company from '../models/Company.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get companies (with optional role filter)
router.get('/', async (req, res) => {
  try {
    const { role } = req.query;
    
    let query = {};
    if (role) {
      query = { 'roles.title': role };
    }
    
    const companies = await Company.find(query)
      .populate('alumni', 'firstName lastName')
      .populate('roles.roleId');
    
    // Format companies for client
    const formattedCompanies = companies.map(company => {
      return {
        id: company._id,
        name: company.name,
        role: company.roles.find(r => r.title === role)?.title || company.roles[0]?.title,
        alumni: company.alumni.map(alumnus => `${alumnus.firstName} ${alumnus.lastName}`)
      };
    });
    
    res.json(formattedCompanies);
  } catch (error) {
    console.error('Error fetching companies:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get company by ID
router.get('/:id', async (req, res) => {
  try {
    const company = await Company.findById(req.params.id)
      .populate('alumni', 'firstName lastName email linkedin')
      .populate('roles.roleId');
    
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    
    res.json(company);
  } catch (error) {
    console.error('Error fetching company:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new company (admin only)
router.post('/', auth, async (req, res) => {
  try {
    // Check if user is admin (in a real app)
    // const user = await User.findById(req.userId);
    // if (user.role !== 'admin') {
    //   return res.status(403).json({ message: 'Not authorized' });
    // }
    
    const { name, description, website, logo, roles } = req.body;
    
    // Check if company already exists
    const existingCompany = await Company.findOne({ name });
    if (existingCompany) {
      return res.status(400).json({ message: 'Company already exists' });
    }
    
    const company = new Company({
      name,
      description,
      website,
      logo,
      roles
    });
    
    await company.save();
    
    res.status(201).json(company);
  } catch (error) {
    console.error('Error creating company:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;