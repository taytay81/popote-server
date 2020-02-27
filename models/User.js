const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    avatar: {
        type: String,
        default: ""
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tags: {
        type: [],
    },
    favorites: {
        type: []
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;