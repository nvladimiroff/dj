import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import io from 'socket.io-client';
import djApp from './reducers';
import { App, Home } from './components/';

let socket = io.connect('localhost:8090');
let store = createStore(
  djApp,
  applyMiddleware(thunk.withExtraArgument(socket))
);

socket.on('action', data => {
  store.dispatch(data);
});

const AppWrapper = props =>
  <Provider store={store}>
    <App room={props.params.room} />
  </Provider>;

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Home} />
    <Route path="/room/:room" component={AppWrapper} />
  </Router>,
  document.getElementById('app')
);
