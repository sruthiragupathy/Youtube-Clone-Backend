const Category = require('../Models/category');

exports.addCategory = async (req, res) => {
  const { name } = req.body;
  const newCategory = new Category({
    name,
  });
  try {
    const response = await newCategory.save();
    res.json({ response });
  } catch (error) {
    res.status(400).json({ response: 'Failed to save category' });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const response = await Category.find({});
    res.json({ response });
  } catch (error) {
    res.status(400).json({ response: 'Failed to save category' });
  }
};
