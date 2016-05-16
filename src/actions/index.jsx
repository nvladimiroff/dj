export const sendMessage = (message, user, room) => {
  return {
    type: 'MESSAGE',
    message,
    user,
    room
  }
};

