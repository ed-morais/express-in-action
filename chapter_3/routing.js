var express = require("express");
var path = require("path");
var http = require("http");

var app = express();

var publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

app.get("/", function (request, response) {
  response.end("Welcome to the homepage!");
});

app.get("/about", function (request, response) {
  response.end("Welcome to the about page!");
});

app.get("/weather", function (request, response) {
  response.end("The current weather is NICE!");
});

app.get("/hello/:who", function (request, response) {
  response.end("Hello, " + request.params.who + ".");
  // This has some security issues!
});

app.use(function (request, response) {
  response.statusCode = 404;
  response.end("404!");
});

var EVIL_IP = "123.45.67.89";
app.use(function (request, response, next) {
  if (request.ip === EVIL_IP) {
    response.status(401).send("Not allowed!");
  } else {
    next();
  }
});

http.createServer(app).listen(3000);
