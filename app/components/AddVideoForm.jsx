import React, { Component } from 'react';
import { addVideo } from '../actions';
import { reduxForm } from 'redux-form';

class AddVideoForm extends Component {
  onSubmit(obj) {
    const { dispatch, closeModal } = this.props;

    dispatch(addVideo(obj));
    closeModal();
  }

  render() {
    const {
      fields: {title, artist, url},
      handleSubmit,
      closeModal
    } = this.props;

    return (
      <form className="pure-form pure-form-stacked" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <fieldset>
          <label for="title">Title</label>
          <input id="title" type="text" {...title}/>

          <label for="artist">Artist</label>
          <input id="artist" type="text" {...artist}/>

          <label for="url">Paste a Youtube URL here.</label>
          <input id="url" type="text" {...url}/>

          <button type="submit" class="pure-button pure-button-primary">Add to playlist</button>
          <button type="button" onClick={closeModal} class="pure-button">Close</button>
        </fieldset>
      </form>
  );
  }
}

AddVideoForm = reduxForm({
  form: 'playlist',
  fields: ['title', 'artist', 'url'],
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS()
})(AddVideoForm);

export default AddVideoForm;
