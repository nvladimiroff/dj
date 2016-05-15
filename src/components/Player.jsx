import React, { Component } from 'react';

const Player = props => (
  <div className="player">
    <iframe width="420" height="315" src={"https://www.youtube.com/embed/" + props.video} frameborder="0" allowfullscreen></iframe>
  </div>
);

export default Player;
