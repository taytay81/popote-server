const express = require('express')
const router = express.Router();
const ReviewModel = require('../models/Review');

router.get("/", (req, res, next) => {
    ReviewModel.find()
    .then(apiRes => res.status(200).json({ apiRes }))
    .catch(err => console.log(err))
})


module.exports = router;