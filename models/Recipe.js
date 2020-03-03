const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  originId: { type: Number },
  ingredients: [
    {
      type: String
      // required: true
    }
  ],
  instructions: [
    {
      type: Object,
      required: false
    }
  ],
  image: {
    type: String,
    default: "https://cdn.onlinewebfonts.com/svg/img_258083.png"
  },
  title: {
    type: String,
    required: false
  },
  readyTime: { type: Number, default: 25 },
  tags: [],
  servings: { type: Number },
  summary: { type: String }
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;