import React, { Component } from 'react';
import { connect } from 'react-redux';
import { joinQueue } from '../actions';

class Queue extends Component {
  handleClick() {
    const { dispatch, username, room } = this.props;

    dispatch(joinQueue(username, room));
  }

  render() {
    const { queue, inQueue } = this.props;

    return (
      <div className="queue">
            <button type="button" className={"pure-button" + (inQueue ? ' pure-button-disabled' : '')} onClick={this.handleClick.bind(this)}>Join Queue.</button>
            <div>
              {queue.map(person => <span>{person}</span>)}
            </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.toJS().chat.username,
    room: state.toJS().chat.room,
    inQueue: state.toJS().player.inQueue,
    queue: state.toJS().player.queue
  }
};

export default connect(mapStateToProps)(Queue);
