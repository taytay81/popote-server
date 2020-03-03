var express = require("express");
var router = express.Router();
const tagModel = require("../models/Tag");
const RecipeModel = require("../models/Recipe");

/* GET home page. */
router.get("/", function(req, res) {
  tagModel
    .find()
    .then(apiRes => {
      console.log(apiRes);
      res.status(200).json({ apiRes });
    })
    .catch(apiErr => console.error(apiErr));
});
// find recipes by tag name
router.get("/tagname/:tagname", function(req, res, next) {
  const tag = req.params.tagname;
  console.log("ffffffff", tag);

  RecipeModel.find({ tags: { $in: tag } })
    .then(recipes => {
      console.log(recipes);
      res.status(200).json(recipes);
    })
    .catch(err => {
      next(err);
    });
  /*
    const promises = ingredients.map(i => {
      const regex = new RegExp(i, "gi");
      return RecipeModel.find({ summary: { $regex: regex } });
    });
  
    Promise.all(promises)
      .then(recipes => {
        const uniquifiedFlattenReceipes = [...new Set(recipes.flat())];
        res.status(200).json(uniquifiedFlattenReceipes);
      })
      .catch(err => {
        next(err);
      });*/
});

module.exports = router;
