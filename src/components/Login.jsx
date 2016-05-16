import React, { Component } from 'react';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      room: ""
    };
  }

  handleNameChange(e) {
    this.setState({ username: e.target.value });
  }

  handleRoomChange(e) {
    this.setState({ room: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    if(!this.state.username || !this.state.room) {
      return;
    }

    this.props.onSubmit({ username: this.state.username.trim(), room: this.state.room.trim() });
  }

  render() {
    return (
      <div className="login">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" value={this.state.username} onChange={this.handleNameChange.bind(this)}/>
          <input type="text" value={this.state.room} onChange={this.handleRoomChange.bind(this)}/>
          <input type="submit" style={{visibility: "hidden"}} />
        </form>
      </div>
    );
  }
}
