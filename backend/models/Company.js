import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String
  },
  website: {
    type: String
  },
  logo: {
    type: String
  },
  roles: [{
    title: String,
    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role'
    }
  }],
  alumni: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, { timestamps: true });

const Company = mongoose.model('Company', companySchema);

export default Company;