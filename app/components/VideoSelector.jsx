import React, { Component } from 'react';
import { connect } from 'react-redux';
import Sortable from 'react-anything-sortable';
import { reorder, addVideo, removeVideo } from '../actions';
import PlaylistElement from './PlaylistElement';

class VideoSelector extends Component {
  constructor() {
    super();
    this.state = {
      videoText: '',
    };
  }

  render() {
    const { videos, dispatch } = this.props;
    return (
      <div className="selector pure-u-1-3">
        <Sortable onSort={obj => dispatch(reorder(obj))} direction="vertical" dynamic={true}>
          {videos.map((vid, i) =>
            <PlaylistElement className="vertical" sortData={vid} key={i}>
              {vid.title} - {vid.artist} <button onClick={() => dispatch(removeVideo(vid))} className="pure-button button-error">X</button>
            </PlaylistElement>
          )}
        </Sortable>

        <form className="pure-form">
          <input className="video-add" type="text" placeholder="Paste a youtube link here" />
          <button onClick={this.addVideo} type="submit" className="pure-button pure-button-primary">Add</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    videos: state.toJS().player.videos
  }
}

export default connect(mapStateToProps)(VideoSelector);
