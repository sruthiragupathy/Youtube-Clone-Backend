const Playlist = require("../Models/playlist");
const Video = require("../Models/video");

const defaultPlaylists = ["Liked Videos", "Saved Videos", "Watch Later"]

exports.getPlaylistsOfAUser = async (req, res) => {
    const {userId} = req.param;
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
        }
        else {
            res.json({success: true, response: response})
        }
    }
    catch(error) {
        res.json({success: false, response: "Could not find playlists"})
    }

}