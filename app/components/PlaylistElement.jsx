import React from 'react';
import { SortableItemMixin } from 'react-anything-sortable';

const PlaylistElement = React.createClass({
  mixins: [SortableItemMixin],

  render: function(){
    return this.renderWithSortable(
      <div>{this.props.children}</div>
    );
  }
});

export default PlaylistElement;
