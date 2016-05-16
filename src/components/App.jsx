import React, { Component } from 'react';
import { Map } from 'immutable';
import Chat from './Chat';
import Login from './Login';
import { connect } from '../actions';

class App extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      room: '',
      joined: false
    }
  }

  onSubmit({ username, room }) {
    const { socket } = this.props;
    socket.emit('join', username, room);
    this.setState({ joined: true, username, room });
  }

  render() {
    if(!this.state.joined) {
      return <Login onSubmit={ this.onSubmit.bind(this) } />;
    } else {
      return (
        <Chat
          username={this.state.username}
          room={this.state.room}
          socket={ this.props.socket }
        />
      );
    }
  }
}

export default App;
