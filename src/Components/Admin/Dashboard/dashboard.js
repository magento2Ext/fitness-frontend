import React, { Component } from "react";
import { Switch, Redirect, Route } from 'react-router';
import { BrowserRouter, Link } from 'react-router-dom';
import AuthService from "../../../Services/auth.service";
import Sidebar from "../../../Sidebar";
import Header from "../../../header";

export default class Dashboard extends Component {
  constructor(props) {
		super(props);
		this.state = {
		  currentUser: AuthService.getCurrentUser()
		};
	}
	componentDidMount = () => {
		let token = JSON.parse(localStorage.getItem('user'));
		if (!token) {
			this.props.history.push('/');
		} else {
			this.setState({ token: token }, () => {
		});
		}
	}
    
  render() {
    return (
      
        <div class="container-fluid">
			<Header />
			<div class="main-container">
			<div class="menu left-panel">
				<Sidebar />
		  </div>
		  <div class="right-panel">
            <div class="row">
                <div class="col-12">
                    <h2>Coming Soon</h2>
				</div>
            </div>
		 </div>
        </div>
		</div>
    );
  }
}