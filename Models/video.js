const { ObjectID } = require("bson");
const mongoose = require("mongoose");
const { Schema } = mongoose()


const videoSchema = new Schema ({
    _id: {
        type: String,
        trim: true,
        required: "id is required"
    },
    title: {
        type: String,
        trim: true,
        required: "title is required"
    },
    description: {
        type: String,
        trim: true,
        required: "description is required"
    },
    thumbNailUrl: {
        type: String,
        trim: true,
        required: "description is required"
    },
    channelTitle: {
        type: String,
        trim: true,
        required: "channel title is required"
    },
    channelProfile: {
        type: String,
        trim: true,
        required: "channel title is required"
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category"
    }
}, {timestamps: true})

module.exports = mongoose.model("Video", videoSchema);