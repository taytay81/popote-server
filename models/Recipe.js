const mongoose = require("mongoose")
const Schema = mongoose.Schema;


const recipeSchema = new Schema({
    ingredients: [
        {
            type: String,
            required: true
        }
    ],
    instructions: [
        {
            type: String,
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
    readyTime: {type: Number},
    tags: [],
    servings: {type: Number}
})

// calories

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;



// recipeDetails = []

// recipeDetails.forEach(details => {
//     const tags = []
//     const servings = []
//     tags.push(details.cuisines)
//     tags.push(details.dishTypes)
//     tags.push(details.diets)
//     tags.flat()
//     // time = 

// })