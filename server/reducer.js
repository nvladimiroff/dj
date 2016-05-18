import { fromJS, Set, List } from 'immutable';

const initialState = fromJS({
  rooms: {}
});

const connect = (state, action) => {
  if(!state.get('rooms').get(action.room)) {
    return state.setIn(['rooms', action.room, 'users'], Set().add(action.username))
                .setIn(['rooms', action.room, 'messages'], List());
  } else {
    return state.updateIn(['rooms', action.room, 'users'], set => set.add(action.username));
  }
};

const disconnect = (state, action) => {
  return state.updateIn(['rooms', action.room, 'users'], set => set.delete(action.username));
};

const message = (state, action) => {
  const msgElement = fromJS({ message: action.message, username: action.username });
  return state.updateIn(['rooms', action.room, 'messages'], list => list.push(msgElement));
};

const reducer = (state=initialState, action) => {
  switch(action.type) {
    case 'CONNECT':
      return connect(state, action);
    case 'DISCONNECT':
      return disconnect(state, action);
    case 'MESSAGE':
      return message(state, action);
  }
};

export default reducer;
