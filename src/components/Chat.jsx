import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendMessage } from '../actions';
import { toJS } from 'immutable';

class Chat extends Component {
  constructor() {
    super();
    this.state = {
      text: ''
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const { username, room, dispatch } = this.props;
    const message = e.target.children[0].value.trim();
    dispatch(sendMessage(message, username, room));
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
    users: state.toJS().users,
    messages: state.toJS().messages,
    username: state.toJS().username,
    room: state.toJS().room
  };
};

const ConnectedChat = connect(
  mapStateToProps
)(Chat);

export default ConnectedChat;

