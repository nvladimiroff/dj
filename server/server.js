import Server from 'socket.io';

export const startServer = store => {
  const io = new Server().attach(8090);

  io.on('connect', socket => {
    let unsubscribe;
    let info = {};

    socket.on('join', data => {
      unsubscribe = store.subscribe(() => {
        const state = store.getState().getIn(['rooms', data.room]).toJS();
        io.emit('action', { type: 'SET_STATE', state });
      });

      store.dispatch({ type: 'CONNECT', username: data.username, room: data.room });
      info = data
    });

    socket.on('action', store.dispatch.bind(store));

    socket.on('disconnect', () => {
      if(unsubscribe) {
        unsubscribe();
        store.dispatch({ type: 'DISCONNECT', username: info.username, room: info.room })
      }
    });
  });
};

