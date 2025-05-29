import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['alumni', 'student', 'admin'],
    default: 'student'
  },
  graduationYear: {
    type: String,
    required: function() {
      return this.role === 'alumni';
    }
  },
  department: {
    type: String,
    required: function() {
      return this.role === 'alumni' || this.role === 'admin' || this.role === 'student';
    }
  },
  company: {
    type: String,
    required: function() {
      // Only required for alumni who have completed their profile
      return this.role === 'alumni' && this.profileComplete;
    },
    default: ''  // Set default empty string
  },
  profileComplete: {
    type: Boolean,
    default: false
  },
  jobTitle: {
    type: String
  },
  profilePicture: {
    type: String,
    default: ''
  },
  linkedin: {
    type: String
  },
  bio: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;