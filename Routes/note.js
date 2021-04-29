const express = require('express');
const {
  getAllNotesOfAUser,
  createNotesForAVideo,
  addNoteToExistingVideo,
  updateNote,
  deleteNote,
} = require('../Controllers/note');

const router = express.Router();

router.get('/:userId/notes', getAllNotesOfAUser);
router.post('/:userId/notes/:videoId', createNotesForAVideo);
router.put('/:userId/notes/:videoId', addNoteToExistingVideo);
router.post('/:userId/notes/:videoId/:noteId', updateNote);
router.delete('/:userId/notes/:videoId/:noteId', deleteNote);

module.exports = router;
