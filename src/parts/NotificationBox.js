import React, { Component, PropTypes } from 'react';
import Snackbar from 'material-ui/Snackbar';


export default class NotificationBox extends Component{
	constructor(props){
		super(props);
	}

	render(){
		const SnackbarStyle = {
		    top: 0,
		    bottom: 'auto',
		    left: (window.innerWidth - 288) / 2,
		    transform: this.props.message ?
		        'translate3d(0, 0, 0)' :
		        `translate3d(0, -50px, 0)`
		}
		return (
			<Snackbar
	          open={this.props.open}
	          message={this.props.message}
	          autoHideDuration={4000}
	          onRequestClose={this.props.onClose}
	          style={SnackbarStyle}
        	/>
		)
	}
}

NotificationBox.propTypes = {
	message: PropTypes.string,
	open: PropTypes.bool,
	onClose: PropTypes.func.isRequired
}