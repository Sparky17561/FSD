// routes/ideaRoutes.js
const express = require('express');
const router = express.Router();
const { createIdea, getIdeas, bookmarkIdea, getBookmarkedIdeas } = require('../controllers/ideaController');

// Endpoint to create a new idea
router.post('/', createIdea);

// Endpoint to get all ideas for a specific user (expects user ObjectId)
router.get('/user/:userId', getIdeas);

// Endpoint to toggle bookmark for an idea
router.put('/bookmark', bookmarkIdea); // Note: No URL parameter here
// Route to get all bookmarked ideas for a user (by clerkId)
router.get('/bookmark/:clerkId', getBookmarkedIdeas);

module.exports = router;
