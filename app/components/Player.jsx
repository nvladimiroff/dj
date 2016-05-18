import React, { Component } from 'react';
import { Map } from 'immutable';


const video = "dQw4w9WgXcQ";

const initialState = Map({
  video: "",
  playing: false
});

const Player = props => (
  <div className="player">
    <iframe width="420" height="315" src={"https://www.youtube.com/embed/" + props.video} frameborder="0" allowfullscreen></iframe>
  </div>
);

export default Player;
