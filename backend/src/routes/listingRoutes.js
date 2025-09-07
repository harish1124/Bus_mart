const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadMiddleware'); // Make sure this line is near the top
const {
  createListing,
  getListings,
  getListing,
  updateListing,
  deleteListing
} = require('../controllers/listingController');
const { authenticateToken } = require('../middlewares/authMiddleware');
// Public routes
router.get('/', getListings);
router.get('/:id', getListing);

// Protected routes with upload middleware for POST (create listing)
router.post('/', authenticateToken, upload.array('images', 5), createListing); // <-- Add Multer here

router.put('/:id', authenticateToken, updateListing); // You can add upload middleware here too if you want to support image updates.
router.delete('/:id', authenticateToken, deleteListing);

module.exports = router;
