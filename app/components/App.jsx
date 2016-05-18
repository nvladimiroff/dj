import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import Login from './Login';
import Chat from './Chat';
import Player from './Player';
import VideoSelector from './VideoSelector';
import { joinRoom } from '../actions';

class App extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      joined: false
    }
  }

  onSubmit({ username }) {
    const { socket, room, dispatch } = this.props;
    this.setState({ joined: true, username });
    dispatch(joinRoom(username, room));
  }

  render() {
    if(!this.state.joined) {
      return <Login onSubmit={ this.onSubmit.bind(this) } />;
    } else {
      return (
        <div className="container">
          <VideoSelector />
          <Player />
          <Chat />
        </div>
      );
    }
  }
}

export default connect()(App);
