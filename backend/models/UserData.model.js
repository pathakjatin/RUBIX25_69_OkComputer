const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true },
    github: { type: String },
    linkedin: { type: String },
    domain: { type: String, required: true },
    role: {
      type: String,
      enum: ["host", "participant", "mentor"],
      required: true,
    },
    organizationName: {
      type: String,
      required: function () {
        return this.role === "host"; // 'host' role requires organization name
      },
    },
    qualifications: {
      type: String,
      required: function () {
        return this.role === "mentor"; // 'mentor' role requires qualifications
      },
    },
    resume: { type: String, required: false }, // Resume is optional (for participants)
    profilePic: { type: String },
  },
  { timestamps: true }
);

// Hash password before saving to database
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare entered password with the hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
