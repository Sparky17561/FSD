// server.js
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Mount user routes
app.use('/api/users', require('./routes/userRoutes'));
// Mount idea routes
app.use('/api/ideas', require('./routes/ideaRoutes'));

// Test route to confirm the server is running
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
