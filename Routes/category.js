const express = require('express');
const { addCategory, getCategories } = require('../Controllers/category');

const router = express.Router();

router.get('/categories', getCategories);
router.post('/category', addCategory);

module.exports = router;
