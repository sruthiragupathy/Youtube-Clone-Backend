const jwt = require('jsonwebtoken');
const Playlist = require('../Models/playlist');
const Video = require('../Models/video');
const User = require('../Models/user');

exports.isAuthorizedUser = (req, res, next) => {
	const token = req.headers.authorization;
	try {
		const decoded = jwt.verify(token, process.env.SECRET_KEY);
		req.userId = decoded.userId;
		next();
	} catch (error) {
		console.error(error);
		res
			.status(401)
			.json({ message: 'Unauthorised access, please add the token' });
	}
};

// exports.getUserById = async (req, res, next, id) => {
// 	try {
// 		const user = await User.findById(id);
// 		if (!user) {
// 			throw Error('No such user found');
// 		}
// 		req.user = user;
// 		next();
// 	} catch (error) {
// 		return res.status(400).json({ success: true, error: error.message });
// 	}
// };

// exports.getPlaylistByUser = async (req, res, next) => {
// 	try {
// 		const playlists = await Playlist.find({ userId: req.userId });
// 		req.playlists = playlists;
// 		next();
// 	} catch (error) {
// 		return res.status(400).json({ error: error.message });
// 	}
// };

exports.getVideoById = async (req, res, next, id) => {
	try {
		const video = await Video.findById(id);
		req.video = video;
		next();
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

exports.getPlaylistById = async (req, res, next, id) => {
	try {
		const playlist = await Playlist.findById(id);
		req.playlist = playlist;
		next();
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};
