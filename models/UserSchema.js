const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  type: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  loans: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Loan',
    },
  ],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
