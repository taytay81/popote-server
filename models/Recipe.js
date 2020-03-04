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
    type: String
  },
  title: {
    type: String,
    required: false
  },
  readyTime: { type: Number, default: 25 },
  tags: [],
  servings: { type: Number },
  summary: { type: String },
  rating: { type: Number, default: 4 },
  ratingCount:  { type: Number, default: 1 }
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
