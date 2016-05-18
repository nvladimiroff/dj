var express = require('express');

var app = express();
var port = 3000;

app.get("/", function(req, res) {
  res.sendFile(__dirname + '/dist/index.html')
})

app.get("/room/:room", function(req, res) {
  res.sendFile(__dirname + '/dist/index.html')
})

app.use(express.static(__dirname + '/dist'));

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("http://localhost:%s/", port)
  }
});
