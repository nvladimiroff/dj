export const connect = user => {
  return {
    type: 'CONNECT',
    user,
  }
};

export const message = (user, message) => {
  return {
    type: 'MESSAGE',
    user,
    message
  }
};

