import React, { Component } from 'react';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import { grey900 } from 'material-ui/styles/colors';


export default class Err404 extends Component{
	render(){
		return (
			<div style={{height: "70vh"}}>
				<h1>Error 404, - Page not found</h1>
				<Link to="/">
					<RaisedButton
					  backgroundColor={grey900}
					  label="Go Home"
					  labelColor="white"
					/>
				</Link>
			</div>
		)
	}
}