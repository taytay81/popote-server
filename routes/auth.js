var express = require("express");
var router = express.Router();
const userModel = require("../models/User");
const bcrypt = require("bcryptjs");
const uploader = require("./../config/cloudinary");
const passport = require("passport");

router.post("/signup", uploader.single("avatar"), (req, res, next) => {
    // console.log("file ?", req.file);
    // console.log(req.body);
    var errorMsg = "";
    const { lastname, firstname, password, email } = req.body;
    // @todo : best if email validation here or check with a regex in the User model
    if (!password || !email) errorMsg += "Provide email and password.\n";
    
    if (errorMsg) return res.status(403).json(errorMsg); // 403	Forbidden
  
    const salt = bcrypt.genSaltSync(10);
    // more on encryption : https://en.wikipedia.org/wiki/Salt_(cryptography)
    const hashPass = bcrypt.hashSync(password, salt);
  
    const newUser = {
      lastname,
      firstname,
      email,
      password: hashPass
    };

    // check if an avatar FILE has been posted
    if (req.file) newUser.avatar = req.file.secure_url;

    userModel
        .create(newUser)
        .then(newUserFromDB => {
        res.status(200).json({msg: "signup ok"});
        })
        .catch(err => {
        console.log("signup error", err);
        next(err);
    });
});

router.use("/is-loggedin", (req, res) => {
    if(req.isAuthenticated()) {
        const {_id, username, favorites, email, avatar, role} = req.body
        return res.status(200).json ({
            currentUser: {
                _id,
                username,
                email,
                avatar,
                favorites,
                role
            }
        });
    }
    res.status(403).json("Unauthorized")
});



module.exports = router;