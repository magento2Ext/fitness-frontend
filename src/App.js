import React, { Component } from 'react'
import { Switch, Redirect, Route } from 'react-router';
import { BrowserRouter, Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap'
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/style.css";
import AuthService from "./Services/auth.service";
import Login from "./Components/OrgLogin/login";
import Profile from "./Components/OrgLogin/profile";
import Dashboard from "./Components/Dashboard/dashboard";
import Organizations from "./Components/Organization/organizations-list";
import Motivations from "./Components/Motivations/motivations";
import Employees from "./Components/Employees/employees";

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
            <Route exact path="/dashboard" component={Dashboard} />
			<Route exact path="/organizations-list" component={Organizations} />
            <Route exact path="/motivational-videos" component={Motivations} />
			<Route exact path="/employees" component={Employees} />
       </Switch> 
	   </BrowserRouter>
    </main>
	
    )
  }
}

export default App