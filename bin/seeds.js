require("dotenv").config();
require("../config/mongo");
//DB MODEL IMPORT
const ingredientModel = require("../models/Ingredient");
const userModel = require("../models/User");
const tagModel = require("../models/Tag");
const recipeModel = require("../models/Recipe");

//OBJECT IMPORT
const ingredientNames = require("./seedObjects/ingredientSeeds");
const recipesToClean = require("./seedObjects/recipeSeed");
const recipeDetails = require("./seedObjects/recipeDetailsSeeds");
const tagSeeds = require("./seedObjects/tagSeeds");
const userSeeds = require("./seedObjects/userSeeds");

//INTIALIZATION OF OBJECTS TO BE SEEDED - ONES THAT ARE EXTERNAL AND NEED TO BE CHANGED
const ingredients = [];
const recipes = [];

// SEEDING FUNCTIONS
function seedIngredients() {
  createIngreObj();
  ingredientModel.insertMany(ingredients);
}

function seedRecipes(callbk) {
  recipeModel.insertMany(cleanTheRecipes(recipeDetails));
}

function seedUsers(users) {
  userModel.insertMany(users);
}

function seedTags(tags) {
  tagModel.insertMany(tags);
}

//FUNCTIONS THAT CHANGE THE EXTERNAL DATA
function createIngreObj() {
  ingredientNames.forEach(name => ingredients.push({ name: name, image: "" }));
}

function cleanTheRecipes(recipeDetails) {
  recipesToClean.forEach(recipe => {
    const cleanRecipe = {};
    cleanRecipe.title = recipe.title;
    cleanRecipe.image = recipe.image;
    cleanRecipe.originId = recipe.id;
    cleanRecipe.ingredients = [];
    recipe.missedIngredients &&
      recipe.missedIngredients.map(ingredient => ingredient.name);
    cleanRecipe.ingredients.push(
      ...(recipe.usedIngredients &&
        recipe.usedIngredients.map(ingredient => ingredient.name))
    );
    // get details
    let match = recipeDetails.find(details => details.id === recipe.id);
    let tags = match.cuisines;
    tags.push(...match.dishTypes);
    tags.push(...match.diets);
    cleanRecipe.tags = [...tags];
    cleanRecipe.readyTime = match.readyInMinutes;
    cleanRecipe.servings = match.servings;
    cleanRecipe.instructions =
      match.analyzedInstructions[0] && match.analyzedInstructions[0].steps;
    cleanRecipe.summary = match.summary;
    cleanRecipe.rating = 4;

    recipes.push(cleanRecipe);
  });
  return recipes;
}

// SEED FUNCTION CALLS
seedIngredients();
seedTags(tagSeeds);
seedUsers(userSeeds);
seedRecipes(cleanTheRecipes(recipeDetails));

// ===== RUNNING THE CLEAN BASED ON THE =====
// ===== wILL BECOME A HELPER THAT IS CALLED BY OBJECTS =====

// async function getAPIData(clbk) {
//   try {
//     const apiResult = await axios.get(
//       "https://api.spoonacular.com/recipes/informationBulk?ids=539355,256051,202146,696050,600343,113568,25116,379457,419475,163591&apikey="
//     );
//     console.log(apiResult.data);
//     clbk(apiResult.data);
//   } catch (err) {
//     console.error(err);
//   }
// }
// getAPIData(cleanTheRecipes);
