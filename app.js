// Imports
require("dotenv").config({ path: ".env" });
//require('dotenv').config();
const webPush = require("web-push");
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
// const http = require('http');
const ejs = require("ejs");
var Sentiment = require("sentiment");
require("./db/conn");
require("dotenv").config();

const { resolveSoa } = require("dns");

//import { meditationsc } from "./public/js/meditate.js";

//console.log(meditationsc);

const formatMessage = require("./utils/messages");

// Intialize the app
const app = express();

//passport authentication
var User = require("./db/models/users");
var Match = require("./db/models/match");
var MatchUser = require("./db/models/match");
var passport = require("passport");
var localStrategy = require("passport-local"),
  methodOverride = require("method-override");
app.use(
  require("express-session")({
    secret: "This is the decryption key",
    resave: false,
    saveUninitialized: false,
  })
);

// Database connect
mongoose.connect("mongodb+srv://chehak:123@cluster0.ohkb1.mongodb.net/UserDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(methodOverride("_method"));
app.use(passport.initialize()); //use to use passport in our code
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Socket.io imports
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser);

// Template engine
app.set("view engine", "ejs");

// For parsing application/json
app.use(bodyParser.json());

// Loading static files
app.use(express.static("public"));
app.use(express.static("views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "views")));
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

var authRoutes = require("./routes/auth.js");
var counter = 0;
app.use("/", authRoutes);

// Homepage rendering
// Journal page rendering
app.get("/journal", (req, res) => {
  res.render("journal");
});


// Ports
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Lazy bum on Port ${PORT}`);
});
