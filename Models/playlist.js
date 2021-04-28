const mongoose = require('mongoose');

const { Schema } = mongoose;

const childSchema = new Schema({
  video: {
    type: Schema.Types.ObjectId,
    ref: 'Video',
  },
});

const playlistSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    name: {
      type: String,
      trim: true,
      required: 'Playlist name is required',
    },
    videos: [childSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Playlist', playlistSchema);
