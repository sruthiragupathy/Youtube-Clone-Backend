const express = require('express');
const {
  getVideoById,
  getPlaylistByUser,
  getUserById,
  getPlaylistById,
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

router.param('userId', getUserById);
router.param('userId', getPlaylistByUser);
router.param('videoId', getVideoById);
router.param('playlistId', getPlaylistById);

router.get('/:userId/playlists', getPlaylistsOfAUser);
router.get('/playlist/:playlistId', getVideosOfAPlaylist);
router.post('/:userId/playlists/:videoId', createPlaylist);
router.post('/playlist/:playlistId/:videoId', addVideoToPlaylist);
router.delete('/playlist/:playlistId/:videoId', removeVideoFromPlaylist);
router.delete('/playlists/:playlistId', removePlaylist);

module.exports = router;
