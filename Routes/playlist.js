const express = require("express");
const { getPlaylistsOfAUser } = require("../Controllers/playlist");
const router = express.Router();

router.get("/:userId/playlists", getPlaylistsOfAUser);

module.exports = router;