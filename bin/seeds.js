require("dotenv").config();
require("../config/mongo");
const ingredientModel = require("../models/Ingredient");
const axios = require("axios");
const recipeModel = require("../models/Recipe");

const ingredientNames = require("./ingredientSeed");
const recipesToClean = require("./recipeSeed");

const users = [
  {
    avatar: "",
    name: "andrew",
    email: "and@pot.com",
    password: 123,
    tags: [],
    favorites: []
  },
  {
    avatar: "",
    name: "taytay",
    email: "tay@pot.com",
    password: "321",
    tags: [],
    favorites: []
  },
  {
    avatar: "",
    name: "pierre",
    email: "try@pot.com",
    password: 213,
    tags: [],
    favorites: []
  }
];

const tag = [
  {
    name: "vegetarian",
    type: "diet"
  },
  {
    name: "soy",
    type: "allergy"
  },
  {
    name: "snack",
    type: "course"
  },
  {
    name: "dinner",
    type: "course"
  },
  {
    name: "mediterranean",
    type: "cuisine"
  },
  {
    name: "dairy",
    type: "allergy"
  }
];

const ingredients = [];

const recipes = [];

function createIngreObj() {
  ingredientNames.forEach(name => ingredients.push({ name: name, image: "" }));
}

// function cleanTheRecipes(recipeDetails) {
//   recipesToClean.forEach(recipe => {
//     const cleanRecipe = {};
//     cleanRecipe.title = recipe.title;
//     cleanRecipe.image = recipe.image;
//     cleanRecipe.ingredients = [
//         recipe.missedIngredients && recipe.missedIngredients.filter(ingredient => ingredient.name)
//     ];
//     cleanRecipe.ingredients.push(
//         recipe.usedIngredients && recipe.usedIngredients.filter(ingredient => ingredient.name)
//     );
//     cleanRecipe.ingredients.flat();
//     const match = recipeDetails.filter(details => details.id === recipe.id)[0];
//     cleanRecipe.readyTime = match.readyTime;
//     recipes.push(cleanRecipe);
//   });
// }

function seedIngredients() {
  createIngreObj();
  ingredientModel.insertMany(ingredients);
}

// RUNNING THE CLEAN BASED ON THE 
// async function getAPIData(clbk) {
//     try {
//       const apiResult = await axios.get(
//         "https://api.spoonacular.com/recipes/informationBulk?ids=539355,256051,202146,696050,600343,113568,25116,379457,419475,163591&apiKey=350a17dd25c84822b1ed7c1878ffd679"
//       );
//       console.log(apiResult.data);
//       clbk(apiResult.data);
//     } catch (err) {
//       console.error(err);
//     }
//   }
seedIngredients() 

// getAPIData(cleanTheRecipes)