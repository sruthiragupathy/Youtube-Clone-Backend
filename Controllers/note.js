const _ = require('lodash');
const Note = require('../Models/note');

const getAllNotesOfAUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const response = await Note.find({ userId });
    res.json({ response });
  } catch (error) {
    res.status(400).json({ response: error.message });
  }
};

const createNotesForAVideo = async (req, res) => {
  const { userId, videoId } = req.params;
  const { note, time } = req.body;
  const notesOfAVideo = await Note.findOne({ userId, videoId });
  if (notesOfAVideo) {
    try {
      await notesOfAVideo.notes.push({
        note,
        time,
      });
      // console.log({notesOfAVideo});
      await notesOfAVideo.save();
      const response = await Note.find({ userId });
      console.log(response);
      res.json({ response });
    } catch (error) {
      res.status(400).json({ response: error.message });
    }
  } else {
    const createNote = new Note({
      userId,
      videoId,
      notes: [
        {
          note,
          time,
        },
      ],
    });
    try {
      await createNote.save();
      const response = await Note.find({ userId });
      res.json({ response });
    } catch (error) {
      res.status(400).json({ response: error.message });
    }
  }
};

const updateNote = async (req, res) => {
  const { userId, videoId, noteId } = req.params;
  console.log({ userId, videoId, noteId });
  const { note, time } = req.body;
  console.log({ note, time });
  try {
    const notesOfAVideo = await Note.findOne({ videoId, userId });
    console.log(notesOfAVideo);
    let noteToBeUpdated = notesOfAVideo.notes.id(noteId);
    console.log(noteToBeUpdated);
    noteToBeUpdated = _.extend(noteToBeUpdated, { note });
    notesOfAVideo.notes = _.extend(notesOfAVideo.notes, { noteToBeUpdated });
    await notesOfAVideo.save();
    const response = await Note.find({ userId });
    res.json({ response });
  } catch (error) {
    res.status(400).json({ response: error.message });
  }
};

const deleteNote = async (req, res) => {
  const { userId, videoId, noteId } = req.params;
  try {
    const notesOfAVideo = await Note.findOne({ videoId, userId });
    await notesOfAVideo.notes.id(noteId).remove();
    await notesOfAVideo.save();
    const response = await Note.find({ userId });
    res.json({ response });
  } catch (error) {
    res.status(400).json({ response: error.message });
  }
};

module.exports = {
  getAllNotesOfAUser,
  createNotesForAVideo,
  updateNote,
  deleteNote,
};
