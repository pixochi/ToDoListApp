import React, { Component } from 'react';
import { TableRowColumn } from 'material-ui/Table';


export default class ColumnCenter extends Component{
	render(){
		const rowStyle = {
 		 whiteSpace: 'normal',
 		 wordWrap: 'break-word',
 		 textAlign:"center",
 		 padding:"4px 5em 4px 0"
		}
		return (
			<TableRowColumn style={rowStyle}>
				{ this.props.children }
			</TableRowColumn>
		)
	}
}