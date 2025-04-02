// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    // Clerk ID from your authentication provider (unique identifier)
    clerkId: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    name: { type: String },
    // Field to store the user’s Groq API key
    groqApiKey: { type: String },
  },
  { timestamps: true } // Automatically manages createdAt and updatedAt
);

module.exports = mongoose.model('User', userSchema);
