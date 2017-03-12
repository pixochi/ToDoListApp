import React, { Component } from 'react';
import { Link } from 'react-router';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconHome from 'material-ui/svg-icons/action/home';


export default class Header extends Component{
	render(){
		const linkStyle = {
			textDecoration:"none",
			color:"white"
		}
		return (
			<AppBar 
				iconElementLeft = {<Link to="/"><IconButton><IconHome color="white"/></IconButton></Link>}
				title={
				<Link to="/" style={linkStyle}>Just Another ToDo App</Link>
			} />
		)
	}
}