import { fromJS, Set, List } from 'immutable';

const initialState = fromJS({
  rooms: {},
  users: {}
});

const initialRoomState = fromJS({
  users: [],
  messages: [], // :: [{message, username}]
  queue: [],
  playing: {}, // :: {started, video :: {artist, title, url, duration}}
  isPlaying: false
});

const connect = (state, action) => {
  if(!state.get('rooms').get(action.room)) {
    return state.setIn(['rooms', action.room], initialRoomState.set('users', [action.username]));
  } else {
    return state.updateIn(['rooms', action.room, 'users'], set => set.add(action.username));
  }
};

const disconnect = (state, action) => {
  return state.updateIn(['rooms', action.room, 'users'], set => {
    if (set)
      return set.delete(action.username);
  });
};

const message = (state, action) => {
  const msgElement = fromJS({ message: action.message, username: action.username });
  return state.updateIn(['rooms', action.room, 'messages'], list => {
    if(list)
      return list.push(msgElement);
  });
};

const joinQueue = (state, action) => {
  return state.updateIn(['rooms', action.room, 'queue'], list => list.push(action.username));
};

const updatePlaylist = (state, action) => {
  return state.setIn(['users', action.username, 'playlist'], fromJS(action.playlist));
};

const nextVideo = (state, action) => {
  const queue = state.getIn(['rooms', action.room, 'queue']);
  let next;
  let newQueue = queue;
  let playlist;

  do {
    if(!newQueue || newQueue.size == 0) {
      return state.setIn(['rooms', action.room, 'isPlaying'], false);
    }
    next = newQueue.get(0);
    newQueue = newQueue.shift();
    playlist = state.getIn(['users', next, 'playlist']);
  } while(!playlist || !playlist.get(0));

  const newPlaying = fromJS({ started: action.time, video: playlist.get(0) });
  const newPlaylist = playlist.shift().push(playlist.get(0));
  return state.setIn(['users', next, 'playlist'], newPlaylist)
              .set('playing', newPlaying)
              .setIn(['rooms', action.room, 'queue'], newQueue)
              .setIn(['rooms', action.room, 'isPlaying'], true);

};

const reducer = (state=initialState, action) => {
  switch(action.type) {
    case 'CONNECT':
      return connect(state, action);
    case 'DISCONNECT':
      return disconnect(state, action);
    case 'MESSAGE':
      return message(state, action);
    case 'JOIN_QUEUE':
      return joinQueue(state, action);
    case 'UPDATE_PLAYLIST':
      return updatePlaylist(state, action);
    case 'NEXT_VIDEO':
      return nextVideo(state, action);
  }
};

export default reducer;
