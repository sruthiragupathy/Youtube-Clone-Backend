const express = require('express');
const { addCategory } = require('../Controllers/category');

const router = express.Router();

router.post('/category', addCategory);

module.exports = router;
