const express = require('express');
const router = express.Router();
// const User = require('../models/UserSchema'); // Assuming your User model is in a 'models' directory

const userController = {
  // Get all users
  async getAllUsers(req, res) {
    try {
      const users = await User.find().populate('loans'); // Populate loans for each user
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // Create a new user
  async createUser(req, res) {
    const user = new User({
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
      type: req.body.type || 'user',
      loans: req.body.loans || [], // Assuming you pass loan IDs while creating a user
    });

    try {
      const newUser = await user.save();
      res.status(201).json(newUser);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  // Get a single user by ID
  async getUserById(req, res) {
    try {
      const user = await User.findById(req.params.id).populate('loans'); // Populate loans for the user
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // Update a user
  async updateUser(req, res) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (req.body.email != null) {
        user.email = req.body.email;
      }
      if (req.body.name != null) {
        user.name = req.body.name;
      }
      if (req.body.password != null) {
        user.password = req.body.password;
      }
      if (req.body.type != null) {
        user.type = req.body.type;
      }
      if (req.body.loans != null) {
        user.loans = req.body.loans; // Assuming you pass loan IDs for update
      }

      const updatedUser = await user.save();
      res.json(updatedUser);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  // Delete a user
  async deleteUser(req, res) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      await user.remove();
      res.json({ message: 'User deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

module.exports = userController;
