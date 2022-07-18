import React from 'react';
import { Switch, Redirect, Route } from 'react-router';
import { BrowserRouter, Link } from 'react-router-dom';
import AuthService from "./Services/auth.service";
import Organization from "./Components/Admin/Organization/organizations-list";
import Sidebar from "./Sidebar";
class Content extends React.Component {
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
	<div class="container">
      <Sidebar />
	  <div class="main-content">
		Dashboard Content Coming Soon
	  </div>
	  </div>
    );
  }
}

export default Content