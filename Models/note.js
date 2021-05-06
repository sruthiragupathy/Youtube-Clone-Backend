const mongoose = require('mongoose');

const { Schema } = mongoose;

const childSchema = new Schema({
  note: {
    type: String,
    trim: true,
  },
  time: {
    type: String,
    trim: true,
  },
});

const noteSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    videoId: {
      type: Schema.Types.ObjectId,
      ref: 'Video',
    },
    notes: [childSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Note', noteSchema);
