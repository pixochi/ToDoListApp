import React, { Component, PropTypes } from 'react';
import axios from 'axios';
import TodoAdd from '../parts/TodoAdd';
import TodoFilter from '../parts/TodoFilter';
import TodoTable from '../parts/TodoTable';
import NotificationBox from '../parts/NotificationBox';
import ConfirmationDialog from '../parts/ConfirmationDialog';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export default class TodoList extends Component{
	constructor(props){
		super(props);
		this.state = {
			todos: [],
			msgOpen: false,
			msgContent: "",
			confirmationOpen:false,
			selectedTodoId: null
		}
		this.addTodo = this.addTodo.bind(this);
		this.handleFilter = this.handleFilter.bind(this);
		this.onNotificationClose = this.onNotificationClose.bind(this);
		this.openConfirmation = this.openConfirmation.bind(this);
		this.closeConfirmation = this.closeConfirmation.bind(this);
		this.deleteConfirmed = this.deleteConfirmed.bind(this);
	}

	componentDidMount() {
		this.loadData();
  	}

  	loadData(filter = this.props.location.query){
  		axios.get("/api/todos",{params:filter})
			.then(resp => {
				this.setState({todos: resp.data});
			})
			.catch(err => {
				console.log(err);
			});
  	}

	addTodo(todo){
		axios.post("/api/todos",todo)
			.then(resp => {
				const newTodo = resp.data;
				this.setState(prevState => {
					return {todos: [...prevState.todos,newTodo],
							msgOpen:true,
							msgContent:"New ToDo has been added."
					}
				});
			})
			.catch(err => {
				console.log(err);
			});
    }

    handleFilter(query){
    	Object.keys(query).forEach(key => {
    		if(query[key] === ""){
    			delete query[key];
    		}
    	});
    	this.loadData(query);
    }

    onNotificationClose(){
    	this.setState({msgContent:"",msgOpen:false});
    }

    openConfirmation(id){
	    this.setState({confirmationOpen: true, selectedTodoId:id});
	};

	closeConfirmation(){
	    this.setState({confirmationOpen: false});
	};
	deleteConfirmed(){
		if(this.state.selectedTodoId){
		axios.delete("/api/todos/"+this.state.selectedTodoId)
    		 .then(resp => {
    		 	if(resp.status === 200){
			 		this.loadData();
			 		this.setState({confirmationOpen:false,msgOpen:true, msgContent:"To-do has been deleted."});
			 	}
    		 });
		}
	}

	render(){
		 const actions = [
	      <FlatButton
	        label="Cancel"
	        primary={true}
	        onTouchTap={this.closeConfirmation}
	      />,
	      <FlatButton
	        label="Delete"
	        primary={true}
	        onTouchTap={this.deleteConfirmed}
	      />,
	    ];

		return (
			<div>
       			<ConfirmationDialog
       			 onClose={this.closeConfirmation}
       			 open={this.state.confirmationOpen}
       			 deleteConfirmed={this.deleteConfirmed} 
       			/>
    			<NotificationBox open={this.state.msgOpen} message={this.state.msgContent} onClose={this.onNotificationClose}/>
				<TodoFilter filter={this.handleFilter}/>
				<TodoTable openConfirmation={this.openConfirmation} todos={this.state.todos} />
				<TodoAdd add={this.addTodo} />
			</div>
		)
	}
}
TodoList.propTypes = {
	todos: PropTypes.arrayOf(PropTypes.object)
}