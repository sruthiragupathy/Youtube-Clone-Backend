const mongoose = require("mongoose");
const {Schema} = mongoose;

const categorySchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: "Name is required"
    }
}, {timestamps: true})

module.exports = mongoose.model("Category", categorySchema);