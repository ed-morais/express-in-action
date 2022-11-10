var express = require("express");
var path = require("path");

var app = express();

var filePath = path.join(__dirname, "celine.jpg");

app.use(function (req, res) {
  res.sendFile(filePath);
});

app.use(function(err, req, res, next) {
    console.error(err)
    next(err)
})

app.use(function (req, res, next) {
  res.sendFile(filePath, function (err) {
    if (err) {
      next(new Error("Error sending file"));
    }
  });
});

app.listen(3000, function () {
  console.log("App has started on port 3000");
});
