var express = require("express")
var logger = require("morgan")
var fs = require("fs")

var app = express()

app.use(function(req, res, next) {
    console.log("Request IP: " + req.url)
    console.log("Request Date: " + new Date())
    next()
})

app.listen(3000, function() {
    console.log("App started on port 3000")
})