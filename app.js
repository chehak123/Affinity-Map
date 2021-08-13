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
require("dotenv").config();

const { resolveSoa } = require("dns");

//import { meditationsc } from "./public/js/meditate.js";

//console.log(meditationsc);

const formatMessage = require("./utils/messages");

// Intialize the app
const app = express();

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


// Homepage rendering
// Journal page rendering
app.get("/", (req, res) => {
  res.render("journal");
});


// Ports
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Lazy bum on Port ${PORT}`);
});
