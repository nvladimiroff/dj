import React, { Component } from 'react';
import { connect } from 'react-redux';
import Sortable from 'react-anything-sortable';
import Modal from 'react-modal';
import { reorder, addVideo, removeVideo } from '../actions';
import PlaylistElement from './PlaylistElement';
import AddVideoForm from './AddVideoForm';

class VideoSelector extends Component {
  constructor() {
    super();
    this.state = {
      videoText: '',
      isModalOpen: false
    };
  }

  openModal() {
    this.setState({isModalOpen: true});
  }

  closeModal() {
    this.setState({isModalOpen: false});
  }

  render() {
    const { videos, dispatch } = this.props;

    return (
      <div className="selector pure-u-1-3">
        <button onClick={this.openModal.bind(this)} className="pure-button pure-button-primary">Add a video</button>
        <Sortable onSort={obj => dispatch(reorder(obj))} direction="vertical" dynamic={true}>
          {videos.map((vid, i) =>
            <PlaylistElement className="vertical" sortData={vid} key={i}>
              {vid.title} - {vid.artist} <button onClick={() => dispatch(removeVideo(vid))} className="pure-button button-error">X</button>
            </PlaylistElement>
          )}
        </Sortable>
        <Modal
          isOpen={this.state.isModalOpen}
          onRequestClose={this.closeModal}>
          <AddVideoForm
            closeModal={this.closeModal.bind(this)}
          />
        </Modal>
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
