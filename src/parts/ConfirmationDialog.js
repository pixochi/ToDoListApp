import React, { Component, PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';


export default class ConfirmationDialog extends Component {
  constructor(props){
    super(props);
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.props.onClose}
      />,
      <FlatButton
        label="Delete"
        primary={true}
        onTouchTap={this.props.deleteConfirmed}
      />,
    ];

    return (
      <div>
        <Dialog
          actions={actions}
          modal={false}
          open={this.props.open}
          onRequestClose={this.props.onClose}
          style={{textAlign:"center"}}
        >
          <span style={{fontSize:"1.5em"}}>Delete selected to-do?</span>
        </Dialog>
      </div>
    );
  }
}

ConfirmationDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  deleteConfirmed: PropTypes.func.isRequired
}