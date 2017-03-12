import React, { Component } from 'react';
import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

 export default class App extends Component{
 	constructor(props){
 		super(props);
 	}
 	render(){
 		return(
 			<div>
 				<Header />
 				{ this.props.children }
 				<Footer />
 			</div>
 		)
 	}
 }