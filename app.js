require("dotenv").config();
require("./config/mongo");
require("./config/passport");

var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

const passport = require("passport");
const session = require("express-session")

const _DEVMODE = false;




var app = express();
app.use(cookieParser());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(
  session({
    cookie: { secure: false, maxAge: 4 * 60 * 60 * 1000 }, // 4 hours
    resave: true,
    saveUninitialized: true,
    secret: process.env.SECRET_SESSION
  })
);

// this rule allows the client app to exchange via http via the server (AJAX ... Axios)
const corsOptions = {
  origin: [process.env.CLIENT_URL],
  /* credentials : Configures the Access-Control-Allow-Credentials CORS header. Set to true to pass the header, otherwise it is omitted  https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Credentials */
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));


app.use(passport.initialize());
app.use(passport.session());



if (_DEVMODE === true) {
  app.use(function devMode(req, res, next) {
      req.user = {
        _id: "5e5d1ee21db32c5a287b4636",
        lastname: "Turtle",
        firstname: "Pierre",
        email: "admin@popote.io"
      }
      next();
    });
}

// cors middle on
var indexRouter = require("./routes/index.js");
var usersRouter = require("./routes/users.js");
var tagRouter = require("./routes/tags.js")
var authRouter = require("./routes/auth.js")
var reviewRouter = require("./routes/review.js")

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/tags", tagRouter);
app.use("/auth", authRouter);
app.use("/reviews", reviewRouter);


module.exports = app;
