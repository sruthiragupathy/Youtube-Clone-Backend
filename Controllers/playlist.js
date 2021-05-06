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
        videos: [],
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
    } else {
      const responsePromises = await response.map((el) =>
        el.populate('videos.video').execPopulate()
      );
      const allPlaylists = await Promise.all(responsePromises);
      res.json({ success: true, response: allPlaylists });
    }
  } catch (error) {
    res.json({ success: false, response: error.message });
  }
};

const getVideosOfAPlaylist = async (req, res) => {
  const { playlistId } = req.params;
  try {
    const response = await Playlist.findById(playlistId);
    await response.populate('videos.video').execPopulate();
    res.json({ response: response.videos });
  } catch (error) {
    res.status(400).json({ response: error.message });
  }
};
const createPlaylist = async (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;
  const { video } = req;
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
    res.status(400).json({ response: error.message });
  }
};

const addVideoToPlaylist = async (req, res) => {
  const { playlist, video } = req;
  try {
    if (!playlist.videos.id(video._id)) {
      playlist.videos.push({ _id: video._id, video: video._id });
      await playlist.save();
    }
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
    res.json({ response: error.message });
  }
};

const removePlaylist = async (req, res) => {
  const { playlist } = req;
  try {
    await Playlist.remove({ _id: playlist._id });
    res.json({ response: playlist._id });
  } catch (error) {
    res.status(400).json({ response: error.message });
  }
};

module.exports = {
  getPlaylistsOfAUser,
  createPlaylist,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  removePlaylist,
  getVideosOfAPlaylist,
};
