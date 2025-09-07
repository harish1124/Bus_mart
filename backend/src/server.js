require('dotenv').config();
require('./models/index');
const express = require('express');
const cors = require('cors');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

const sequelize = require('./config/db');
const User = require('./models/user');

sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.error('Database connection error:', err));

sequelize.sync({ alter: true })
  .then(() => console.log('All models synced'))
  .catch(err => console.error('Sync error:', err));

const authRoutes = require('./routes/authRoutes');

app.use('/api/auth', authRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const userRoutes = require('./routes/userRoutes');
app.use('/api/user', userRoutes);

const categoryRoutes = require('./routes/categoryRoutes');
app.use('/api/categories', categoryRoutes);

const listingRoutes = require('./routes/listingRoutes');
app.use('/api/listings', listingRoutes);

const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
