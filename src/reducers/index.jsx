import { combineReducers } from 'redux';
import { fromJS } from 'immutable';

const initialState = fromJS({
  user: '',
  room: '',
  messages: {}
});

const chat = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_STATE':
      return action.state;
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

