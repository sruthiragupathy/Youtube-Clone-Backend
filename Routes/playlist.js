const express = require("express");
const { getVideoById, getPlaylistByUser, getUserById, getPlaylistById } = require("../Controllers/param");
const { getPlaylistsOfAUser, createPlaylist, addVideoToPlaylist } = require("../Controllers/playlist");
const router = express.Router();

router.param("userId", getUserById);
router.param("userId", getPlaylistByUser);
router.param("videoId", getVideoById);
router.param("playlistId", getPlaylistById);


router.get("/:userId/playlists", getPlaylistsOfAUser);
router.post("/:userId/playlists/:videoId", createPlaylist);
router.post("/playlist/:playlistId/:videoId", addVideoToPlaylist);



module.exports = router;