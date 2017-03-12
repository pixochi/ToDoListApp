import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';
import { grey900,grey300 } from 'material-ui/styles/colors';

export default class Footer extends Component{
	render(){
		const footerStyle = {
			backgroundColor:grey900,
			width:"100%",
			height:"120px",
			marginTop:"7px",
			borderRadius:"3px"
		}
		const footerTextStyle = {
			textAlign: "center",
			color:grey300,
			fontSize:"1.3em",
			paddingTop:"15px"
		}
		const iconStyle = {
			paddingLeft:"17px",
			color:"white"
		}
		return (
			<footer style={footerStyle}>
				<div style={footerTextStyle}>
					<p>Just-Another-ToDo-App by <span style={{color:"white",fontSize:"1.1em"}}>Pixochi</span></p>
					<div style={{marginTop:"-10px"}}>
						<a href="https://www.linkedin.com/in/jakub-kozakcs/" target="_blank">
							<FontIcon style={iconStyle} className="fa fa-4x fa-linkedin" />
						</a>
						<a href="https://github.com/pixochi" target="_blank">
							<FontIcon style={iconStyle} color="white" className="fa fa-4x fa-github" />
						</a>
					</div>
				</div>
			</footer>
		)
	}
}