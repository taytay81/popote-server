var express = require("express");
var router = express.Router();
const tagModel = require("../models/Tag");

/* GET home page. */
router.get("/", function(req, res) {
    tagModel
        .find()
        .then(apiRes => {
            console.log(apiRes)
            res.status(200).json({apiRes})
        })
        .catch(apiErr => console.error(apiErr))
});

module.exports = router;