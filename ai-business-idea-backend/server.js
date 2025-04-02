require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Import CORS
const connectDB = require('./config/db');

const app = express();

// Enable CORS (Allow frontend to make requests)
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from your frontend
  credentials: true // Allow cookies if needed
}));

// Connect to MongoDB
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Mount user routes
app.use('/api/users', require('./routes/userRoutes'));
// Mount idea routes
app.use('/api/ideas', require('./routes/ideaRoutes'));

// Test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
