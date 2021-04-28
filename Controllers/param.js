const Playlist = require("../Models/playlist");
const Video = require("../Models/video");
const User = require("../Models/user");


// video

exports.getUserById = async (req, res, next, id) => {
   try{
            const user = await User.findById(id);
            if(!user){
                throw Error("No such user found");
            }
            console.log({user})
            req.user = user;
            next();
            }
            catch(error) {
                return res.status(400).json({success: true, error: error.message})
            }
    
}

exports.getPlaylistByUser = async (req, res, next, id) => {
    try {
        const playlists = await Playlist.find({userId:id});
        console.log({playlists})
        req.playlists = playlists;
        next()
    }
    catch(error) {
        return res.status(400).json({success: true, error: error.message})
    }
}

exports.getVideoById = async (req, res, next, id) => {
    try {
        const video = await Video.findById(id);
        console.log({video})
        req.video = video;
        next()
    }
    catch(error) {
        return res.status(400).json({success: true, error: error.message})
    }
}

exports.getPlaylistById = async (req, res, next, id) => {
    try {
        const playlist = await Playlist.findById(id);
        req.playlist = playlist;
        next();
    }
    catch(error) {
        return res.status(400).json({success: true, error: error.message})
    }
}
