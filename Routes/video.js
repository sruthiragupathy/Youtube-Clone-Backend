const express = require("express");
const { addCategory } = require("../Controllers/category");
const { getAllVideos } = require("../Controllers/video");
const router = express.Router();
router.get("/videos", getAllVideos);

module.exports = router;