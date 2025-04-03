import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  skills: [{
    type: String,
    trim: true
  }],
  courses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }],
  companies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company'
  }]
}, { timestamps: true });

const Role = mongoose.model('Role', roleSchema);

export default Role;