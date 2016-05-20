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

  componentWillUpdate() {
    this.refs.messages.scrollTop = this.refs.messages.scrollHeight;
  }

  handleSubmit(e) {
    e.preventDefault();
    const { username, room, dispatch } = this.props;
    const message = e.target.children[0].value.trim();

    if(!message)
      return;

    dispatch(sendMessage(message, username, room));
    this.setState({ text: '' });
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  render() {
    const { messages } = this.props;

    return (
      <div className="chat pure-u-1-3">
        <ul ref="messages" className="messages">
          {messages.map(msg => <li>{msg.username + ': ' +msg.message}</li> ) }
        </ul>
        <div className="footer">
          <form className="pure-form" onSubmit={ this.handleSubmit.bind(this) } >
            <input type="text" value={this.state.text} placeholder="Message" onChange={this.handleChange.bind(this) } />
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
    users: state.toJS().chat.users,
    messages: state.toJS().chat.messages,
    username: state.toJS().chat.username,
    room: state.toJS().chat.room
  };
};

const ConnectedChat = connect(
  mapStateToProps
)(Chat);

export default ConnectedChat;

