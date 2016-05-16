import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import djApp from './reducers';
import App from './components/App';
import io from 'socket.io-client';

let store = createStore(djApp);

let socket = io.connect('localhost:8090');

socket.on('action', data => {
  store.dispatch(data);
});

ReactDOM.render(
  <Provider store={store}>
    <App socket={socket}/>
  </Provider>,
  document.getElementById('app')
);
