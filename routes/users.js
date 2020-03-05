var express = require("express");
var router = express.Router();
const userModel = require("../models/User");
const uploader = require("../config/cloudinary");

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

router.patch("/:id", uploader.single("avatar"), (req, res) => {
  console.log(">>>>>>>", req.body);
  const updatedUser = req.body;
  if (req.file) updatedUser.avatar = req.file.secure_url;

  userModel
    .findByIdAndUpdate(req.params.id, updatedUser)
    .then(dbRes => {
      console.log(dbRes);
      res.status(200).json(dbRes);
    })
    .catch(dbErr => console.error(dbErr));
});

module.exports = router;
