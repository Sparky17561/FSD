// controllers/ideaController.js
const axios = require('axios');
const Idea = require('../models/Idea');
const User = require('../models/User');
const Bookmark = require('../models/Bookmark');

// Retrieve all ideas for a user (expects userId as an ObjectId)
exports.getIdeas = async (req, res) => {
  try {
    const { userId } = req.params;
    const ideas = await Idea.find({ user: userId });
    res.status(200).json(ideas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Toggle bookmark for an idea using clerkId and ideaId
exports.bookmarkIdea = async (req, res) => {
  try {
    // Expects a JSON body with clerkId and ideaId
    // e.g. { "clerkId": "abc123", "ideaId": "67ea62e3249fa6bda350eea1" }
    const { clerkId, ideaId } = req.body;
    
    // Find the user by clerkId
    const user = await User.findOne({ clerkId });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    
    // Check if a bookmark for this idea already exists for the user
    const existingBookmark = await Bookmark.findOne({ user: user._id, idea: ideaId });
    if (existingBookmark) {
      // If found, remove it (toggle off)
      await existingBookmark.remove();
      return res.status(200).json({ message: 'Bookmark removed.' });
    } else {
      // Otherwise, create a new bookmark record (toggle on)
      const newBookmark = await Bookmark.create({
        user: user._id,
        idea: ideaId,
      });
      return res.status(201).json(newBookmark);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new idea: triggers Groq API with detailed prompt engineering and saves the idea
exports.createIdea = async (req, res) => {
  try {
    const { user, category, prompt, files } = req.body;

    // Find the user by clerkId to retrieve their Groq API key
    const foundUser = await User.findOne({ clerkId: user });
    if (!foundUser || !foundUser.groqApiKey) {
      return res.status(400).json({ message: 'Groq API key not found for this user.' });
    }
    const groqApiKey = foundUser.groqApiKey;

    // Detailed base prompt for comprehensive business idea generation
    const basePrompt =
      "You are a creative business idea generator. Please generate a detailed, innovative, and practical business idea. " +
      "Consider market trends, potential revenue streams, target audience, and any unique value propositions. " +
      "Ensure the idea is feasible and clearly structured. " +
      "Use the following user input as inspiration: ";
    const combinedPrompt = basePrompt + prompt;

    // Prepare payload for the Groq API call
    const payload = {
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: combinedPrompt,
        }
      ]
    };

    // Trigger the Groq API
    const groqResponse = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${groqApiKey}`
        }
      }
    );

    // Extract generated content from the Groq API response
    const generatedContent = groqResponse.data.choices?.[0]?.message?.content || 'No content generated';

    // Save the idea in the database (storing the user's ObjectId reference)
    const ideaRecord = await Idea.create({
      user: foundUser._id,
      category,
      prompt,
      generatedContent,
      files,
    });

    res.status(201).json(ideaRecord);
  } catch (error) {
    console.error('Error generating idea:', error.message);
    res.status(500).json({ error: error.message });
  }
};


// Retrieve all bookmarked ideas for a user (by clerkId)
exports.getBookmarkedIdeas = async (req, res) => {
    try {
      // Expecting clerkId in URL parameters
      const { clerkId } = req.params;
      
      // Find the user by clerkId
      const user = await User.findOne({ clerkId });
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
      
      // Find all bookmarks for this user and populate the idea details
      const bookmarks = await Bookmark.find({ user: user._id }).populate('idea');
      
      res.status(200).json(bookmarks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  