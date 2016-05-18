const message = (msg, username, room) => {
  return {
    type: 'MESSAGE',
    message: msg,
    username,
    room
  }
};

export const sendMessage = (msg, username, room) => (dispatch, getState, socket) => {
  dispatch(message(msg, username, room));
  socket.emit('action', message(msg, username, room));
};

const join = (username, room) => {
  return {
    type: 'JOIN',
    username,
    room
  }
};

export const joinRoom = (username, room) => (dispatch, getState, socket) => {
  dispatch(join(username, room));
  socket.emit('join', join(username, room));
};
