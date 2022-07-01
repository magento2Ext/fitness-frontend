import React, { Component } from "react";
import AuthService from "../../Services/auth.service";
export default class Profile extends Component {
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
    const { currentUser } = this.state;
    return (
      <div className="sdsds">
       dd 
        
      </div>
    );
  }
}