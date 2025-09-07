const Category = require('../models/category');

const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      where: { isActive: true },
      order: [['name', 'ASC']],
    });
    res.json({ categories });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const createCategory = async (req, res) => {
  const { name, description } = req.body;

  try {
    const category = await Category.create({ name, description });
    res.status(201).json({ message: 'Category created', category });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'Category name already exists' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getCategories, createCategory };
