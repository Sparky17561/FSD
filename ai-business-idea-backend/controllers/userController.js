// controllers/userController.js
const User = require('../models/User');

// Create a new user (e.g., after Clerk authentication, if profile doesn’t exist)
exports.createUser = async (req, res) => {
  try {
    const { clerkId, email, name, groqApiKey } = req.body;
    // Check if user already exists
    let user = await User.findOne({ clerkId });
    if (user) {
      return res.status(200).json(user);
    }
    // Create new user
    user = await User.create({ clerkId, email, name, groqApiKey });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user profile by Clerk ID
exports.getUserProfile = async (req, res) => {
  try {
    const { clerkId } = req.params;
    const user = await User.findOne({ clerkId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update user profile (e.g., update the Groq API key)
exports.updateUserProfile = async (req, res) => {
  try {
    const { clerkId } = req.params;
    const updates = req.body;
    const user = await User.findOneAndUpdate({ clerkId }, updates, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
