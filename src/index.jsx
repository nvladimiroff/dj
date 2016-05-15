import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import djApp from './reducers';
import App from './components/App';
import io from 'socket.io-client';

let store = createStore(djApp);
/*
ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('app')
);
*/

const socket = io('localhost:8090');
socket.on('state', state => {
  console.log(state);
});

socket.emit('join', 'nick', 'longcat' );
