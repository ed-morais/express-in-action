var http = require('http') // require the http module

// Defines a function that'll handle incoming HTTP requests
function requestHandler(req, res) {
  console.log("In comes a request to: " + req.url);
  res.end('Hello World')
}

var server = http.createServer(requestHandler) // create a server that uses the requestHandler function

server.listen(3000) // start the server on port 3000