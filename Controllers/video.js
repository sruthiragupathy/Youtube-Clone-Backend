const Video = require("../Models/video");


exports.getAllVideos = async (req, res) => {
    try {
    const response = await Video.find({})
    res.json({ success: true, response: response })
    }
    catch(error) {
    res.json({ success: false, response: "Could not fetch videos" })
    }
    

}
