const Playlist = require("../Models/playlist");
const Video = require("../Models/video");
const mongoose = require("mongoose");

const defaultPlaylists = ["Liked Videos", "Saved Videos", "Watch Later"]

exports.getPlaylistsOfAUser = async (req, res) => {
    const {userId} = req.params;

    try {
        const response = await Playlist.find({userId});
        if(!response.length) {
            const transformedData = defaultPlaylists.map( playlist => {
                return {
                    userId: userId,
                    name: playlist,
                    playlists: []
                }
            })
            try {
                const response =  await Playlist.insertMany(transformedData)
                res.json({success: true, message: "Default playlists created successfully", response: response})
            }
            catch( error ){
                res.json({ success: false, response: error.message})
            }
            // await createDefaultPlaylist(userId)
        }
        else {
            res.json({success: true, response: response})
        }
    }
    catch(error) {
        res.json({success: false, response: "Could not find playlists"})
    }

}


exports.createPlaylist = async (req, res) => {
    const  { userId } = req.params;
    const { name } = req.body;
    const { video } = req;
    console.log(mongoose.Types.ObjectId.isValid(video._id))
    const newVideo = new Playlist({
        userId: userId,
        name: name,
        videos: [{_id:video._id, video: video._id}]
    })
    try {
         let response = await newVideo.save();
         response = await response.populate('videos.video').execPopulate()
        res.json({success: true, response: response})
        
    }
    catch(error) {
        res.json({success: false, response: error.message})
    }
}

exports.addVideoToPlaylist = async (req, res) => {
    let { playlist, video } = req;
    // const { videoId } = req.params;
    let updatePlaylist = new Playlist;
    updatePlaylist = playlist
    try {
        if(!updatePlaylist.videos.id(video._id)){
            updatePlaylist = playlist.videos.push({_id: video._id, video: video._id})
            updatePlaylist = await playlist.save();
        }
        updatePlaylist = await updatePlaylist.populate('videos.video').execPopulate()
        res.json({success: true, response: updatePlaylist})
    }
    catch(error) {
        res.json({success: true, response: error.message})
    }


}
