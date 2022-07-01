import React from 'react';
import { Switch, Redirect, Route } from 'react-router';
import { BrowserRouter, Link } from 'react-router-dom';
import AuthService from "../../Services/auth.service";
import Sidebar from "../../Sidebar";
import Header from "../../header";
class Motivation extends React.Component {
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
		Motivation Content Coming Soon
	  </div>
	  </div>
	  </div>
    );
  }
}

export default Motivation