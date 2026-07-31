const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());

// Since both frontend and backend will be hosted on the same Vercel domain 
// using the vercel.json rewrites, standard CORS is sufficient.
app.use(cors());

// Connect Database
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/osint', require('./routes/osint'));
app.use('/api/billing', require('./routes/billing'));
app.use('/api/admin', require('./routes/admin'));

// Local Development Server Execution
// Vercel will ignore this block in production and use the export below
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// REQUIRED FOR VERCEL: Export the Express app as a Serverless Function
module.exports = app;
