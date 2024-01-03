const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

// Routes for handling User CRUD operations
router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.get('/:id', userController.getUserById);
router.patch('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
