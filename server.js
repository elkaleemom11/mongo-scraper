// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");

// Requiring Comment and Article models
var Comment = require("./models/Comment.js");
var Article = require("./models/Article.js");


// Requiring routing controllers
var htmlRouter = require("./controllers/html-routes.js");
var articleRouter = require("./controllers/article-routes.js");
// var articleRouter = require("./html-routes.js");

// Scraping tools
var request = require("request");
var cheerio = require("cheerio");
// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

// Initialize Express
var port = process.env.PORT || 3000;
var app = express();

// Use body parser with the app
app.use(bodyParser.urlencoded({
    extended: false
}));

// Initialize Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routing
app.use("/", htmlRouter);
app.use("/", articleRouter);

// Make public a static dir
app.use(express.static("public"));


// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);





// Show any mongoose errors
mongoose.connection.on("error", function (error) {
    console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
mongoose.connection.once("open", function () {
    console.log("Mongoose connection successful.");
});

// Listen on port 3000
app.listen(port, function () {
    console.log("App running on port 3000!");
});








