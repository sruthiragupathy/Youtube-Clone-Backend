const mongoose = require('mongoose');
const Playlist = require('../Models/playlist');
// const Video = require('../Models/video');

const defaultPlaylists = ['Liked Videos', 'Saved Videos', 'Watch Later'];

const getPlaylistsOfAUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const response = await Playlist.find({ userId });
    if (!response.length) {
      const transformedData = defaultPlaylists.map((playlist) => ({
        userId,
        name: playlist,
        playlists: [],
      }));
      try {
        const createdPlaylist = await Playlist.insertMany(transformedData);
        res.json({
          success: true,
          message: 'Default playlists created successfully',
          response: createdPlaylist,
        });
      } catch (error) {
        res.json({ success: false, response: error.message });
      }
      // await createDefaultPlaylist(userId)
    } else {
      res.json({ success: true, response });
    }
  } catch (error) {
    res.json({ success: false, response: 'Could not find playlists' });
  }
};

const createPlaylist = async (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;
  const { video } = req;
  console.log(mongoose.Types.ObjectId.isValid(video._id));
  const newVideo = new Playlist({
    userId,
    name,
    videos: [{ _id: video._id, video: video._id }],
  });
  try {
    let response = await newVideo.save();
    response = await response.populate('videos.video').execPopulate();
    res.json({ success: true, response });
  } catch (error) {
    res.json({ success: false, response: error.message });
  }
};

const addVideoToPlaylist = async (req, res) => {
  const { playlist, video } = req;
  // const { videoId } = req.params;
  try {
    playlist.videos.push({ _id: video._id, video: video._id });
    await playlist.save();
    await playlist.populate('videos.video').execPopulate();
    res.json({ response: playlist });
  } catch (error) {
    res.status(400).json({ response: error.message });
  }
};

const removeVideoFromPlaylist = async (req, res) => {
  const { playlist, video } = req;
  try {
    await playlist.videos.id(video._id).remove();
    await playlist.save();
    const userPlaylist = await Playlist.findById(playlist._id);
    await userPlaylist.populate('videos.video').execPopulate();
    res.json({ response: userPlaylist });
  } catch (error) {
    res.json({ response: error.response });
  }
};

module.exports = {
  getPlaylistsOfAUser,
  createPlaylist,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
};
