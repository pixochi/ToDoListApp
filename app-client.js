import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import App from './src/App.js';
import TodoList from './src/components/TodoList.js';
import Err404 from './src/components/Err404.js';
import EditTodo from './src/components/EditTodo.js'

injectTapEventPlugin();

ReactDOM.render(
	<MuiThemeProvider>
		<Router history={browserHistory}>
			<Route path="/" component={App}>
				<IndexRoute component={TodoList} />
				<Route path="/todos/:id/:title" component={EditTodo} />
				<Route path="*" component={Err404} />
			</Route>
		</Router>
	</MuiThemeProvider>,
	document.getElementById('main')
 );
