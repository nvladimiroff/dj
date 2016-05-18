import { combineReducers } from 'redux';
import { fromJS } from 'immutable';

const initialState = fromJS({
  users: [],
  username: '',
  room: '',
  messages: []
});

const chat = (state = initialState, action) => {
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
}
/*
const djApp = combineReducers({
  video,
  chat
});
*/
const djApp = chat;
export default djApp;

