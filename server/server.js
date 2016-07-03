import Server from 'socket.io';
import moment from 'moment';
import { nextVideo } from './actions';

export const startServer = store => {
  const io = new Server().attach(8090);

  io.on('connect', socket => {
    let unsubscribe;
    let info = {};

    socket.on('join', data => {
      unsubscribe = store.subscribe(() => {
        const state = store.getState().getIn(['rooms', data.room]);
        const chatState = state.delete('queue').toJS();
        let playerState = state.delete('messages').delete('users');
        const playlist = store.getState().getIn(['users', data.username, 'playlist']);

        if(playlist) {
          playerState = playerState.merge({ videos: playlist.toJS() });
        }

        io.emit('action', { type: 'SET_CHAT_STATE', chatState });
        io.emit('action', { type: 'SET_PLAYER_STATE', playerState: playerState.toJS() });
      });

      store.dispatch({ type: 'CONNECT', username: data.username, room: data.room });
      info = data;
    });

    socket.on('action', store.dispatch.bind(store));

    socket.on('disconnect', () => {
      if(unsubscribe) {
        unsubscribe();
        store.dispatch({ type: 'DISCONNECT', username: info.username, room: info.room })
      }
    });
  });

  setInterval(() => {
    const state = store.getState();
    if(!state) {
      return;
    }

    state.get('rooms').forEach((roomMap, room) => {
      if(!roomMap.get('isPlaying')) {
        store.dispatch(nextVideo(room, moment()));
      }
      else if(roomMap.get('playing')) {
        const duration = moment.duration(roomMap.getIn(['playing', 'duration']));
        const started = moment(roomMap.getIn(['playing', 'started']));
        const finished = started.add(duration);
        if(moment().isBefore(finished)) {
          store.dispatch(nextVideo(room, moment()));
        }
      }
    });
  }, 1000);
};

