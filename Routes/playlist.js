const express = require('express');
const {
	getVideoById,
	getPlaylistByUser,
	getUserById,
	getPlaylistById,
	isAuthorizedUser,
} = require('../Controllers/param');
const {
	getPlaylistsOfAUser,
	createPlaylist,
	addVideoToPlaylist,
	removeVideoFromPlaylist,
	removePlaylist,
	getVideosOfAPlaylist,
} = require('../Controllers/playlist');

const router = express.Router();

router.param('videoId', getVideoById);
router.param('playlistId', getPlaylistById);

router.get('/playlists', isAuthorizedUser, getPlaylistsOfAUser);
router.get('/playlist/:playlistId', isAuthorizedUser, getVideosOfAPlaylist);
router.post('/playlists/:videoId', isAuthorizedUser, createPlaylist);
router.post(
	'/playlist/:playlistId/:videoId',
	isAuthorizedUser,
	addVideoToPlaylist,
);
router.delete(
	'/playlist/:playlistId/:videoId',
	isAuthorizedUser,
	removeVideoFromPlaylist,
);
router.delete('/playlists/:playlistId', isAuthorizedUser, removePlaylist);

module.exports = router;
