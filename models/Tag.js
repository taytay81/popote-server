const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tagSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: [
      "ingredient",
      "allergy",
      "intolerance",
      "diet",
      "cuisine",
      "course",
      "healthy"
    ],
    // flqvor qnd course were replaced by cuisine here but we can change back if we find a different api
    required: true
  }
});

const Tag = mongoose.model("Tag", tagSchema);

module.exports = Tag;
