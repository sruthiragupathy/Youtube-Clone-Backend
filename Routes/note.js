const express = require('express');
const {
	getAllNotesOfAUser,
	createNotesForAVideo,
	updateNote,
	deleteNote,
} = require('../Controllers/note');
const { isAuthorizedUser } = require('../Controllers/param');

const router = express.Router();

router.get('/notes', isAuthorizedUser, getAllNotesOfAUser);
router.post('/notes/:videoId', isAuthorizedUser, createNotesForAVideo);
router.post('/notes/:videoId/:noteId', isAuthorizedUser, updateNote);
router.delete('/notes/:videoId/:noteId', isAuthorizedUser, deleteNote);

module.exports = router;
