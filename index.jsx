import express from 'express';
import { applyMiddleware, createStore } from 'redux';
import reducer from './server/reducer';
import { startServer } from './server/server';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';

const logger = createLogger({
  colors: false
});

const store = createStore(
  reducer,
  applyMiddleware(thunk, promise, logger)
);

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + '/dist/index.html')
})

app.get("/room/:room", (req, res) => {
  res.sendFile(__dirname + '/dist/index.html')
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

