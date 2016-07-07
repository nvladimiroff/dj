import express from 'express';

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + '/dist/index.html')
})

app.get("/room/:room", (req, res) => {
  res.sendFile(__dirname + '/dist/room.html')
})

app.use(express.static(__dirname + '/dist'));
startServer(store);

app.listen(port, (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info("http://localhost:%s/", port)
  }
});

