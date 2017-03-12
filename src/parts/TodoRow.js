import React from 'react';
import { Link } from 'react-router';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import IconDelete from 'material-ui/svg-icons/action/delete';
import IconEdit from 'material-ui/svg-icons/editor/mode-edit';
import { red600 } from 'material-ui/styles/colors';
import { TableRow } from 'material-ui/Table';
import ColumnCenter from './ColumnCenter.js';

export default class TodoRow extends React.Component {

	render(){
		const { _id,title,description,status,priority } = this.props;
		const colStyle = {
			textAlign:"center",
			paddingBottom:"5px",
			paddingTop:"5px"
		}
		return(
				 <TableRow>
				 		<ColumnCenter>{title}</ColumnCenter>
				 		<ColumnCenter>{description}</ColumnCenter>
		                <ColumnCenter>{status}</ColumnCenter>
		                <ColumnCenter>{priority}</ColumnCenter>
		                		                
		                <ColumnCenter>
		                	<Link to={`/todos/${_id}/${title}`} style={{marginRight:"12px"}}>
								<FloatingActionButton mini={true}>
	      							<IconEdit />
	    						</FloatingActionButton>
	    					</Link>
		                	<FloatingActionButton
						 	 onTouchTap={()=>{this.props.openConfirmation(_id)}}
						 	 mini={true}
						 	 backgroundColor={red600}>
      							<IconDelete />
    						</FloatingActionButton>
		                </ColumnCenter>
		     	</TableRow>
		)
	}
}