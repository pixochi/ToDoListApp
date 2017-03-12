import React, { Component, PropTypes } from 'react';
import createHistory from 'history/createBrowserHistory';
import queryString from 'query-string';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import FontIcon from 'material-ui/FontIcon';
import Avatar from 'material-ui/Avatar';
import { greenA700 } from 'material-ui/styles/colors'


export default class TodoFilter extends Component {
	constructor(props){
		super(props);
		this.state = {
			priority:"",
			status:""
		}
		
		this.filterTodos = this.filterTodos.bind(this);
		this.priorityChanged = this.priorityChanged.bind(this);
		this.statusChanged = this.statusChanged.bind(this);
		this.setInputValue = this.setInputValue.bind(this);
	}

	componentDidMount(){
		this.history = createHistory();;
		let urlQuery = queryString.parse(location.search);
		this.urlQuerytoState(urlQuery);
		this.unlisten = this.history.listen((location, action) => {
			urlQuery = queryString.parse(location.search);
			this.urlQuerytoState(urlQuery);
		});
	}

	componentWillUnmount(){
		this.unlisten();
	}

	urlQuerytoState(urlQuery){
		let newState = {};
		Object.keys(this.state).forEach(key => {
				const stateValue = urlQuery[key] ? urlQuery[key] : "";
				newState[key] = stateValue;
		});
		this.setState(newState,() => {
			this.props.filter(urlQuery)}
		);
	}

	stateToUrlQuery(){
		let query = "";
		Object.keys(this.state).forEach(key => {
			if(this.state[key]){
				query += query ? "&" : "?";
				query += `${key}=${this.state[key]}`
			}
		});
		return query;
	}

	filterTodos(){
		this.props.filter(this.state);
		this.history.push({pathname:"/",search:this.stateToUrlQuery()});
	}

	priorityChanged(event, index, value){
		this.setState({priority:value},() => {
			this.filterTodos();
		});
	}

	statusChanged(event, index, value){
		this.setState({status:value},() => {
			this.filterTodos();
		});
	}

	setInputValue(inputName){
		return this.state[inputName] ? this.state[inputName] : "";
	}

	render(){
		return (
			<Card initiallyExpanded={true}>
			    <CardHeader 
			     title="Filter"
			     subtitle="Find your to-do faster"
			     avatar={
			     	<Avatar backgroundColor={greenA700} icon={
			     		<FontIcon className="fa fa-filter" />
			     	}/>	
			     }
			     actAsExpander={true}
			     showExpandableButton={true} />
			    <CardText expandable={true}>	    
				    <SelectField
		          	floatingLabelText="Priority"
		          	floatingLabelFixed={true}
		          	value={this.setInputValue("priority")}
		          	onChange={this.priorityChanged} >
				        <MenuItem value="" primaryText="Any" />
				        <MenuItem value="Low" primaryText="Low" />
				        <MenuItem value="Medium" primaryText="Medium" />
				        <MenuItem value="High" primaryText="High" />
	       			 </SelectField>

	       			 <SelectField
		          	  floatingLabelText="Status"
		          	  floatingLabelFixed={true}
		           	  value={this.setInputValue("status")}
		          	  onChange={this.statusChanged}
		          	 >
				        <MenuItem value="" primaryText="Any" />
				        <MenuItem value="Not started" primaryText="Not started" />
				        <MenuItem value="In progress" primaryText="In progress" />
				        <MenuItem value="Done" primaryText="Done" />
	       			 </SelectField>
			    </CardText>
  		</Card>
		)
	}
}

TodoFilter.propTypes = {
	filter: PropTypes.func.isRequired,
}