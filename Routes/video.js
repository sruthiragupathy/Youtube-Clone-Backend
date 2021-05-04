const express = require('express');
// const { addCategory } = require('../Controllers/category');
const { getAllVideos, getVideoById } = require('../Controllers/video');

const router = express.Router();
router.get('/videos', getAllVideos);
router.get('/video/:_id', getVideoById);

module.exports = router;
