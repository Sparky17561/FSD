// models/Idea.js
const mongoose = require('mongoose');

const ideaSchema = new mongoose.Schema(
  {
    // Reference to the user that generated the idea
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    // Category or domain selected by the user
    category: { type: String },
    // The prompt details that the user provided
    prompt: { type: String },
    // The AI-generated idea content in a fixed document format
    generatedContent: { type: String },
    // A flag to mark whether the idea was bookmarked by the user
    isBookmarked: { type: Boolean, default: false },
    // Array to store file references (e.g., file URLs or local paths)
    files: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Idea', ideaSchema);
