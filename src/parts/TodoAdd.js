import React, { Component, PropTypes } from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import IconPlus from 'material-ui/svg-icons/content/add-circle';
import IconDone from 'material-ui/svg-icons/action/done';
import { greenA700 } from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

export default class TodoAdd extends Component {
	constructor(props){
		super(props);
		this.state = {
			newTodo: {
				title:"",
				status:"Not started",
				description:"",
				priority:""
			},
			submitted:false
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInputChanged = this.handleInputChanged.bind(this);
		this.statusChanged = this.statusChanged.bind(this);
		this.priorityChanged = this.priorityChanged.bind(this);
	}

	handleInputChanged(e){
		const input = e.target;
		const newTodo = this.state.newTodo;
		newTodo[input.name] = input.value;
		this.setState({newTodo});
	}

	statusChanged(event, index, value){
		const newTodo = this.state.newTodo;
		newTodo.status = value;
		this.setState({newTodo});
	}

	priorityChanged(event, index, value){
		const newTodo = this.state.newTodo;
		newTodo.priority = value;
		this.setState({newTodo});
	}

	todoToDefault(){
		this.setState({newTodo: {
				title:"",
				description:"",
				status:"Not started",
				priority:""
			}})
	}

	handleSubmit(e){
		e.preventDefault();
		this.setState({submitted: true});
		const newTodo = this.state.newTodo;
		let hasError = false;
		hasError = Object.keys(newTodo).some(key => {
			return !newTodo[key];
		});
		if(!hasError){
			this.props.add(this.state.newTodo);
			this.setState({submitted:false});
			this.todoToDefault();
		}
	}

	render(){
		const { title,description,status,priority } = this.state.newTodo;
		const { submitted } = this.state;
		const isRequiredText = "This field is required."
		return (
			<Card>
			    <CardHeader 
			     title="Create"
			     subtitle="Add a new to-do"
			     avatar={
			     	<Avatar backgroundColor={greenA700} icon={
			     		<IconPlus />
			     	}/>	
			     }
			     actAsExpander={true}
			     showExpandableButton={true} />
			    <CardText expandable={true} style={{paddingLeft:"4em",paddingTop:"0px"}}>
			    <div style={{display:"inline-block"}}>	      
					<div>
						<TextField
						 name="title"
	      				 floatingLabelText="Title"
	      				 hintText="Title"
	      				 onChange={this.handleInputChanged}
	      				 value={title}
	      				 errorText={(submitted && !title) && <span>{isRequiredText}</span>}
	    				/>
    				</div>
    				<div>
						<TextField
						 name="description"
	      				 floatingLabelText="Description"
	      				 hintText="Description"
	      				 multiLine={true}
	      				 onChange={this.handleInputChanged}
	      				 value={description}
	      				 errorText={(submitted && !description) && <span>{isRequiredText}</span>}
	    				/>
    				</div>
    				<div>
	    				<SelectField
			          	  floatingLabelText="Status"
			          	  floatingLabelFixed={true}
			           	  value={status}
			          	  onChange={this.statusChanged}
			          	  errorText={(submitted && !status) && <span>{isRequiredText}</span>}
			          	>
					        <MenuItem value="Not started" primaryText="Not started" />
					        <MenuItem value="In progress" primaryText="In progress" />
					        <MenuItem value="Done" primaryText="Done" />
		       			 </SelectField>
	       			 </div>

					<SelectField
		          	 floatingLabelText="Priority"
		          	 value={priority}
		          	 onChange={this.priorityChanged}
		          	 errorText={(submitted && !priority) && <span>{isRequiredText}</span>} >
				        <MenuItem value={null} primaryText="" />
				        <MenuItem value="Low" primaryText="Low" />
				        <MenuItem value="Medium" primaryText="Medium" />
				        <MenuItem value="High" primaryText="High" />
	       			 </SelectField>

					   	<RaisedButton
					     label="Add"
					     labelPosition="before"
					     backgroundColor={greenA700}
					     labelStyle={{color:"white"}}
					     onClick={this.handleSubmit}
					     icon={<IconDone />}
					     style={{display:"block",marginTop:"10px"}}
					    />

				    </div>
			    </CardText>
  		</Card>
		)
	}
}

TodoAdd.propTypes = {
	add: PropTypes.func.isRequired,
}