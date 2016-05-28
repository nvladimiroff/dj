import React, { Component } from 'react';
import store from 'store';

export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
    };
  }

  componentDidMount() {
    const username = store.get('username');
    if(username) {
      this.props.onSubmit({ username });
    }

  }

  handleNameChange(e) {
    this.setState({ username: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    if(!this.state.username) {
      return;
    }

    store.set('username', this.state.username.trim());
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
