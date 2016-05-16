import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendMessage } from '../actions';

class Chat extends Component {
  constructor() {
    super();
    this.state = {
      text: '',
      name: ''
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const { socket, username, room } = this.props;
    const message = e.target.children[0].value.trim();
    socket.emit('action', sendMessage(message, username, room));
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  render() {
    const { messages } = this.props;

    return (
      <div className="chat">
        <ul>
          {messages.map(msg => <li>{msg.username + ': ' +msg.message}</li> ) }
        </ul>
        <div className="footer">
          <form onSubmit={ this.handleSubmit.bind(this) } >
            <input type="text" value={this.state.text} onChange={this.handleChange.bind(this) } />
          </form>
        </div>
      </div>
    );
  }
}

Chat.defaultProps = {
  messages: [],
  users: [],
  username: '',
  room: ''
}

const mapStateToProps = state => {
  return {
    users: state.users,
    messages: state.messages
  };
};

const ConnectedChat = connect(
  mapStateToProps
)(Chat);

export default ConnectedChat;

