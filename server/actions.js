export const nextVideo = (room, started) => (dispatch, getState) => {
  dispatch({ type: 'NEXT_VIDEO', room, started });
};
