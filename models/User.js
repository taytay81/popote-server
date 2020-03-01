const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  avatar: {
    type: String,
    default: "https://cdn.onlinewebfonts.com/svg/img_258083.png"
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
    type: []
  },
  favorites: [{ type: Schema.Types.ObjectId, ref: "recipes" }]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
