var http = require("http");
var path = require("path");
var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");

// Makes an express app
var app = express();

// Views are in the views folder
app.set("views", path.resolve(__dirname, "views"));
// Views will use the ejs engine
app.set("view engine", "ejs");

// Global array to store all the entries
var entries = [];
// Makes this entries array available in all views
app.locals.entries = entries;

// Uses Morgan to log every request
app.use(logger("dev"));

// Populates a variable called req.body if the user is submitting a form
app.use(bodyParser.urlencoded({ extended: false }));

// Renders the homepage
app.get("/", function (request, response) {
  response.render("index");
});

// Renders the "new entry" page when GETing the URL
app.get("/new-entry", function (request, response) {
  response.render("new-entry");
});

// Defines a route handler when you POST to the new "new-entry" URL in contrast to a GET
app.post("/new-entry", function (request, response) {
  // If user submits the form with no title or content, responds with a 400 error
  if (!request.body.title || !request.body.body) {
    response.status(400).send("Entries must have a title and a body");
    return;
  }
  // Adds a new entry to the list of entries
  entries.push({
    title: request.body.title,
    body: request.body.body,
    published: new Date(Date.now()).toLocaleString()
  });
  // Redirects to the homepage to see the new entry
  response.redirect("/");
});

// Renders a 404 page because you're requesting an unknown source
app.use(function(request, response) {
    response.status(404).render("404")
})

// Starts the server on port 3000 :)
http.createServer(app).listen(3000, function() {
    console.log("Guestbook app started on port 3000! :)")
})
