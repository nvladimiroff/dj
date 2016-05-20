import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable';


const video = "dQw4w9WgXcQ";

const NotPlaying = props => (
  <div className="not-playing">
    No one is playing anything right now.
  </div>
);

const Player = props => (
  <div className="player pure-u-1-3">
    { props.playing ? <iframe width="420" height="315" src={"https://www.youtube.com/embed/" + props.video} frameborder="0" allowfullscreen></iframe> : <NotPlaying />}
  </div>
);

const mapStateToProps = state => {
  return {
    playing: state.toJS().player.playing,
    video: state.toJS().player.video
  };
};

export default connect(mapStateToProps)(Player);
