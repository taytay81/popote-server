const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tagSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ["ingredient", "allergy", "intolerance", "diet", "course", "flavor"],
        required: true
    }
})

const Tag = mongoose.model("Tag", tagSchema);

module.exports = Tag;