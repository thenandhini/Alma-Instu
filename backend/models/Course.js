import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String
  },
  resources: [{
    title: String,
    link: String,
    type: {
      type: String,
      enum: ['pdf', 'video', 'article', 'other']
    }
  }],
  roles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role'
  }]
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);

export default Course;