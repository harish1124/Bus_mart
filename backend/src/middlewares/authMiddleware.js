const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Optional: Fetch user from DB to ensure user still exists
    const user = await User.findByPk(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: 'User not found.' });
    }

    req.user = decoded; // Add user info to request
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token.' });
  }
};

module.exports = { authenticateToken };
