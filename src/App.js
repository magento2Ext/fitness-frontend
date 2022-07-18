import React, { Component } from 'react'
import { Switch, Redirect, Route } from 'react-router';
import { BrowserRouter, Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap'
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/style.css";
import AuthService from "./Services/auth.service";
import Login from "./Components/Admin/OrgLogin/login";
import Dashboard from "./Components/Admin/Dashboard/dashboard";
import AdOrganizations from "./Components/Admin/Organization/organizations-list";
import Motivations from "./Components/Admin/Motivations/motivations";
import Education from "./Components/Admin/Education/education";
import Employees from "./Components/Admin/Employees/employees";
import Teachers from "./Components/Admin/Guided-yoga/Teacher/teachers";

import OrgLogin from "./Components/Organization/OrgLogin/login";
import Organizations from "./Components/Organization/Employees/employess-list";
import OrgProfile from "./Components/Organization/OrgLogin/profile";


class App extends Component {
  
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.state = {
      currentUser: undefined,
	};
  }
	
  componentDidMount(){
	const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({
        currentUser: user,
      });
    }
  } 
   
  logOut() {
    AuthService.logout();
  }

 render() {
	  const { currentUser, showModeratorBoard, showAdminBoard } = this.state;
    return (
	
	<main className="container-fluid">
	 <BrowserRouter>
	  <Switch>
			<Route exact path='/' component={Login} />
			<Route exact path='/org-login' component={OrgLogin} />
            <Route exact path="/dashboard" component={Dashboard} />
			<Route exact path="/organizations-list" component={AdOrganizations} />
			<Route exact path="/org-employees" component={Organizations} />
            <Route exact path="/motivations" component={Motivations} />
			<Route exact path="/education" component={Education} />
			<Route exact path="/employees" component={Employees} />
			<Route exact path="/org-profile" component={OrgProfile} />
			<Route exact path="/teachers" component={Teachers} />
       </Switch> 
	   </BrowserRouter>
    </main>
	
    )
  }
}

export default App