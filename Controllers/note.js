const _ = require('lodash');
const Note = require('../Models/note');

const getAllNotesOfAUser = async (req, res) => {
	const { userId } = req;
	try {
		const response = await Note.find({ userId });
		res.json({ response });
	} catch (error) {
		res.status(400).json({ response: error.message });
	}
};

const createNotesForAVideo = async (req, res) => {
	const { videoId } = req.params;
	const { userId } = req;
	const { note, time } = req.body;
	const notesOfAVideo = await Note.findOne({ userId, videoId });
	if (notesOfAVideo) {
		try {
			await notesOfAVideo.notes.push({
				note,
				time,
			});
			await notesOfAVideo.save();
			const response = await Note.find({ userId });
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
	const { videoId, noteId } = req.params;
	const { userId } = req;
	const { note, time } = req.body;
	try {
		const notesOfAVideo = await Note.findOne({ videoId, userId });
		let noteToBeUpdated = notesOfAVideo.notes.id(noteId);
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
	const { videoId, noteId } = req.params;
	const { userId } = req;
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
