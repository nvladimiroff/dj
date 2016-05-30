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

export const addVideo = video => (dispatch, getState, socket) => {
  dispatch({
    type: 'ADD_VIDEO',
    video
  });

  const playlist = getState().get('player').get('videos');
  const username = getState().get('chat').get('username');
  socket.emit('action', {type: 'UPDATE_PLAYLIST', username, playlist})
};

export const removeVideo = video => (dispatch, getState, socket) => {
  dispatch({
    type: 'REMOVE_VIDEO',
    video
  });

  const playlist = getState().get('player').get('videos');
  const username = getState().get('chat').get('username');
  socket.emit('action', {type: 'UPDATE_PLAYLIST', username, playlist})
};

export const reorder = videos => {
  dispatch({
    type: 'REORDER',
    videos
  });

  const playlist = getState().get('player').get('videos');
  const username = getState().get('chat').get('username');
  socket.emit('action', {type: 'UPDATE_PLAYLIST', username, playlist})
};

const joinQ = (username, room) => {
  return {
    type: 'JOIN_QUEUE',
    username,
    room
  }
};

export const joinQueue = (username, room) => (dispatch, getState, socket) => {
  dispatch(joinQ(username, room));
  socket.emit('action', joinQ(username, room));
};
