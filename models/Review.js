const mongoose = require("mongoose")
const Schema = new mongoose.Schema

const reviewSchema = new Schema({
    body: {
        type: String,
        required: true
    },
    recipeId: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
})