const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  github: {
    type: String,
    required: false
  },
  linkedin: {
    type: String,
    required: false
  },
  domain: {
    type: String,
    required: false
  },
  role: {
    type: String,
    enum: ['host', 'participant', 'mentor'],
    required: true
  },
  organizationName: {
    type: String,
    required: function() {
      return this.role === 'host';
    }
  },
  qualifications: {
    type: String,
    required: function() {
      return this.role === 'mentor';
    }
  },
  resume: {
    type: String,
    required: function() {
      return this.role === 'participant';
    }
  },
  profilePic: {
    type: String,
    required: false
  }
}, {
  timestamps: true
});

// Hash password before saving to the database
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});


userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
