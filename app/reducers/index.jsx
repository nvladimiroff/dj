import { combineReducers } from 'redux-immutable';
import { fromJS, toJS, is } from 'immutable';
import { reducer as formReducer } from 'redux-form';

const initialState = fromJS({
  chat: {
    users: [],
    username: '',
    room: '',
    messages: []
  },
  player: {
    video: '',
    playing: false,
    videos: [],
    queue: [],
    inQueue: false
  }
});

const player = (state = initialState.get('player'), action) => {
  switch(action.type) {
    case 'SET_PLAYER_STATE':
      return state.merge(action.playerState);
    case 'ADD_VIDEO':
      return state.update('videos', list => list.unshift(action.video));
    case 'REMOVE_VIDEO':
      console.log("Removing " + action.video.title);
      return state.update('videos', list => list.filterNot(ele => is(ele, fromJS(action.video))));
    case 'REORDER':
      return state.set('videos', fromJS(action.videos));
    case 'JOIN_QUEUE':
      return state.update('queue', list => list.push(action.username))
                  .set('inQueue', true);
    default:
      return state;
  }
};

const chat = (state = initialState.get('chat'), action) => {
  switch(action.type) {
    case 'SET_CHAT_STATE':
      return state.merge(action.chatState);
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
  chat,
  form: (state = fromJS({}), action) => fromJS(formReducer(state.toJS(), action))
});

export default djApp;

