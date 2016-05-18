import React, { Component } from 'react';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
    };
  }

  handleNameChange(e) {
    this.setState({ username: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    if(!this.state.username) {
      return;
    }

    this.props.onSubmit({ username: this.state.username.trim() });
  }

  render() {
    return (
      <div className="login">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" value={this.state.username} onChange={this.handleNameChange.bind(this)}/>
          <input type="submit" style={{visibility: "hidden"}} />
        </form>
      </div>
    );
  }
}
