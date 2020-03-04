const express = require('express')
const router = express.Router();
const ReviewModel = require('../models/Review');
const RecipeModel = require('../models/Recipe');


router.get("/:recipeId", (req, res, next) => {
    ReviewModel.find({recipeId: req.params.recipeId})
    .then(dbRes => res.status(200).json({ dbRes }))
    .catch(err => console.log(err))
})

router.post("/create/:recipeId", (req, res, next) => {
    const {recipeId} = req.params
    const {body, userRating, newRating, newCount} = req.body
    ReviewModel.create({
        recipeId: recipeId,
        userId: req.user._id,
        body: body,
        rating: userRating
    })
    .then(dbRes => {
        RecipeModel.findByIdAndUpdate(recipeId, {rating: newRating, ratingCount: newCount}, {new: true})
        .then(res.status(200).send(dbRes))
        .catch(next)
    })
    .catch(next)


})


module.exports = router;