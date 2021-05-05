const Video = require('../Models/video');

exports.getAllVideos = async (req, res) => {
  try {
    const response = await Video.find({}).populate('category');
    // await response.populate('category');
    res.json({ success: true, response });
  } catch (error) {
    res.json({ success: false, response: error.message });
  }
};

exports.getVideoById = async (req, res) => {
  const _id = req.params;
  try {
    const response = await Video.findById(_id);
    res.json({ response });
  } catch (error) {
    return res.status(400).json({ response: error.message });
  }
};
