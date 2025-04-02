// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const {
  createUser,
  getUserProfile,
  updateUserProfile,
} = require('../controllers/userController');

// Route to create a new user (or get existing profile)
router.post('/', createUser);

// Route to get user profile by Clerk ID
router.get('/:clerkId', getUserProfile);

// Route to update user profile
router.put('/:clerkId', updateUserProfile);

module.exports = router;
