import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import AuthService from "../../Services/orgauth";
import '../../assets/font/iconsmind-s/css/iconsminds.css';
import '../../assets/font/simple-line-icons/css/simple-line-icons.css';
import '../../assets/css/vendor/bootstrap.min.css';
import '../../assets/css/vendor/component-custom-switch.min.css';
import '../../assets/css/dore.light.bluenavy.min.css';
import '../../assets/css/main.css';
import '../../assets/css/custom.css';
import '../../assets/js/custom.js';
import 'bootstrap/dist/js/bootstrap.js';

class Dashboard extends React.Component {
    
  render() {
	var username = JSON.parse(localStorage.getItem('orguser')); 
    return (
	<nav class="navbar fixed-top">
        <div class="d-flex align-items-center navbar-left">
            <a href="#" class="menu-button-mobile d-xs-block d-sm-block d-md-none">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 17">
                    <rect x="0.5" y="0.5" width="25" height="1" />
                    <rect x="0.5" y="7.5" width="25" height="1" />
                    <rect x="0.5" y="15.5" width="25" height="1" />
                </svg>
            </a>
        </div>

        <a class="navbar-logo" href="#">
            <img width="50" alt="Profile Picture" src={require('../../assets/img/logo/Frame@3x.png')} />
        </a>

        <div class="navbar-right">
            <div class="user d-inline-block">
                <button class="btn btn-empty p-0" type="button" data-toggle="dropdown" aria-haspopup="true"
                    aria-expanded="false">
                    <span class="name">{username.organization.organizationName}</span>
                    <span>
                        <img alt="Profile Picture" src={username.organization.logo} />
                    </span>
                </button>

                <div class="dropdown-menu dropdown-menu-right mt-3">
                    <Link onClick={AuthService.logout} to={"/org-login"} className="dropdown-item">Sign out</Link>
                </div>
            </div>
        </div>
    </nav>
	
    );
  }
}

export default Dashboard