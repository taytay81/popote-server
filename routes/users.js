var express = require('express');
var router = express.Router();
const userModel = require("../models/User");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.patch("/:id", (req, res) => {
  console.log(">>>>>>>", req.body)
  const {firstname, lastname, email} = req.body;
  userModel
  .findByIdAndUpdate(req.params.id, {
    firstname, lastname, email
  })
  .then(dbRes => {
    console.log(dbRes);
    res.status(200).json(dbRes)
  })
  .catch(dbErr => console.error(dbErr));
});



module.exports = router;
