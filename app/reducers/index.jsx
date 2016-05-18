import { combineReducers } from 'redux-immutable';
import { fromJS, toJS } from 'immutable';

const initialState = fromJS({
  chat: {
    users: [],
    username: '',
    room: '',
    messages: []
  },
  player: {
    video: '',
    playing: false
  }
});

const player = (state = initialState.get('player'), action) => {
  return state;
};

const chat = (state = initialState.get('chat'), action) => {
  switch(action.type) {
    case 'SET_STATE':
      return state.merge(action.state);
    case 'MESSAGE':
      return state.update('messages', set => set.push({message: action.message, username: action.username }));
    case 'JOIN':
      return state.set('username', action.username).set('room', action.room);
    default:
      return state;
  }
};

const djApp = combineReducers({
  player,
  chat
});

export default djApp;

