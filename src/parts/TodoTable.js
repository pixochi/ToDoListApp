import React, { Component, PropTypes } from 'react';
import TodoRow from './TodoRow';
import ConfirmationDialog from '../parts/ConfirmationDialog';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow}
  from 'material-ui/Table';

export default class TodoTable extends Component {
	constructor(props){
		super(props);
	}

	render(){
		return (
			<div>
				<Card initiallyExpanded={true} style={{margin:"7px 0"}}>
				    <CardText>
				    	<Table fixedFooter={false} hoverable={true} striped={true}>
			        <TableHeader displaySelectAll={false}>
			            <TableRow>
			              <TableHeaderColumn>Title</TableHeaderColumn>
			              <TableHeaderColumn>Description</TableHeaderColumn>
			              <TableHeaderColumn>Status</TableHeaderColumn>
			              <TableHeaderColumn>Priority</TableHeaderColumn>
			              <TableHeaderColumn></TableHeaderColumn>
			            </TableRow>
			         </TableHeader>
			         <TableBody
			            displayRowCheckbox={false}
			            showRowHover={true}
			            stripedRows={true}
			          >
			            {this.props.todos.map( todo => {
			              return <TodoRow
					              key={todo._id} 
					              openConfirmation={this.props.openConfirmation}
					              {...todo} />
			              })}
			         </TableBody>
	       		 </Table>

				    </CardText>
	  		</Card>
	  	</div>
		)
	}
}

TodoTable.propTypes = {
	todos: PropTypes.arrayOf(PropTypes.object),
	openConfirmation: PropTypes.func.isRequired
}