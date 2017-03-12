import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import axios from 'axios';
import NotificationBox from '../parts/NotificationBox';
import IconDone from 'material-ui/svg-icons/action/done';
import { greenA700,grey900 } from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardText } from 'material-ui/Card';
import IconArrowBack from 'material-ui/svg-icons/navigation/arrow-back';

export default class EditTodo extends Component{
	constructor(props){
		super(props);
		this.state = {
			_id:this.props.params.id,
			title:"",
			description:"",
			status:"",
			priority:"",
			msgOpen:false
		}
		this.editTodo = this.editTodo.bind(this);
		this.handleInputChanged = this.handleInputChanged.bind(this);
		this.statusChanged = this.statusChanged.bind(this);
		this.priorityChanged = this.priorityChanged.bind(this);
	}

	componentDidMount(){
		this.loadTodo(this.state._id);
	}

	loadTodo(id){
		if(id){
			axios.get(`/api/todos/${id}`)
			 .then(resp => {
			 	this.setState(resp.data)
			 })
			 .catch(err => {
			 	console.log(err);
			 });
		}
	}

	editTodo(e){
		e.preventDefault();
		axios.put(`/api/todos/${this.state._id}`,this.state)
			 .then(resp => {
			 	if(resp.status === 200){
			 		this.setState({msgOpen:true});
			 	}
			});
	}

	handleInputChanged(e){
		const input = e.target;
		let newState = {};
		newState[input.name] = input.value;
		this.setState(newState);
	}

	statusChanged(event, index, value){
		this.setState({status: value});
	}

	priorityChanged(event, index, value){
		this.setState({priority: value});
	}
	
	render(){
		const { title,description,status,priority } = this.state; 
		return(
			<div>
			<NotificationBox
			  open={this.state.msgOpen}
			  message="To-do has been edited."
			  onClose={()=>this.setState({msgOpen:false})}
			/>
			<Card style={{marginTop:"7px"}}>
			    <CardText style={{paddingLeft:"4em",paddingTop:"5px"}}>
					<div>
						<RaisedButton
						     label="Back"
						     labelPosition="after"
						     backgroundColor={grey900}
						     labelStyle={{color:"white"}}
						     onClick={browserHistory.goBack}
						     icon={<IconArrowBack />}
						 />
						<h1>Edit todo</h1>
						<div style={{display:"inline-block"}}>	      
							<div>
								<TextField
								 name="title"
			      				 floatingLabelText="Title"
			      				 hintText="Title"
			      				 onChange={this.handleInputChanged}
			      				 value={title}
			    				/>
		    				</div>
		    				<div>
								<TextField
								 name="description"
			      				 floatingLabelText="Description"
			      				 hintText="Description(optional)"
			      				 multiLine={true}
			      				 onChange={this.handleInputChanged}
			      				 value={description}
			    				/>
		    				</div>
		    				<div>
			    				<SelectField
					          	  floatingLabelText="Status"
					          	  floatingLabelFixed={true}
					           	  value={status}
					          	  onChange={this.statusChanged}
					          	>
							        <MenuItem value="Not started" primaryText="Not started" />
							        <MenuItem value="In progress" primaryText="In progress" />
							        <MenuItem value="Done" primaryText="Done" />
				       			 </SelectField>
			       			 </div>

							<SelectField
				          	 floatingLabelText="Priority"
				          	 value={priority}
				          	 onChange={this.priorityChanged}>
								<MenuItem value="Low" primaryText="Low" />
								<MenuItem value="Medium" primaryText="Medium" />
						        <MenuItem value="High" primaryText="High" />
			       			 </SelectField>

							   	<RaisedButton
							     label="Edit"
							     labelPosition="before"
							     backgroundColor={greenA700}
							     labelStyle={{color:"white"}}
							     onClick={this.editTodo}
							     icon={<IconDone />}
							     style={{display:"block",marginTop:"10px"}}
							    />
						</div>
					</div>
				</CardText>
			</Card>
			</div>
		)
	}
}

EditTodo.propTypes = {
	params: PropTypes.shape({
		id: PropTypes.string.isRequired
	}),
}