var express = require('express');

var app = express();

var server  = require("http").createServer(app);

app.use(express.static('public'));

server.listen(9992);

console.log("Server listening on port 9992");
