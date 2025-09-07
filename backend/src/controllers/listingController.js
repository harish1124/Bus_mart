const Listing = require('../models/listing');
const Category = require('../models/category');
const createListing = async (req, res) => {
  try {
    // All normal text fields:
    const {
      title, description, price, year, mileage, brand, model,
      seatingCapacity, fuelType, location, categoryId
    } = req.body;

    // Uploaded images via Multer:
    const imagePaths = req.files ? req.files.map(file => file.path) : [];

    // Create the listing:
    const listing = await Listing.create({
      title,
      description,
      price,
      year,
      mileage,
      brand,
      model,
      seatingCapacity,
      fuelType,
      location,
      images: imagePaths, // images is an array of file paths
      userId: req.user.userId,
      categoryId
    });

    res.status(201).json({ message: 'Listing created successfully', listing });
  } catch (error) {
    console.error('Create listing error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all listings (optionally filter by category, search, etc.)
const getListings = async (req, res) => {
  try {
    const { categoryId, search } = req.query;
    const where = {};

    if (categoryId) where.categoryId = categoryId;
    if (search)
      where.title = { [require('sequelize').Op.like]: '%' + search + '%' };

    const listings = await Listing.findAll({
      where,
      include: [
        { model: Category, attributes: ['name'] }
      ],
      order: [['createdAt', 'DESC']]
    });
    res.json({ listings });
  } catch (error) {
    console.error('Get listings error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single listing by ID
const getListing = async (req, res) => {
  try {
    const listing = await Listing.findByPk(req.params.id, {
      include: [
        { model: Category, attributes: ['name'] }
      ]
    });
    if (!listing) return res.status(404).json({ message: 'Listing not found' });
    res.json({ listing });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update listing (owner/admin only)
const updateListing = async (req, res) => {
  try {
    const listing = await Listing.findByPk(req.params.id);
    if (!listing) return res.status(404).json({ message: 'Listing not found' });

    // Optionally: only allow owner or admin
    if (listing.userId !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await listing.update(req.body);
    res.json({ message: 'Listing updated', listing });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete listing (owner/admin only)
const deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findByPk(req.params.id);
    if (!listing) return res.status(404).json({ message: 'Listing not found' });

    // Optionally: only allow owner or admin
    if (listing.userId !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await listing.destroy();
    res.json({ message: 'Listing deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createListing,
  getListings,
  getListing,
  updateListing,
  deleteListing
};
