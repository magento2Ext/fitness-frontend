import React, { Component } from "react";
import { useHistory } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../../../Services/auth.service";
import '../../../assets/css/vendor/bootstrap-float-label.min.css';
const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.state = {
      email: "",
      password: "",
      loading: false,
      message: ""
    };
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }
  handleLogin(e) {
    e.preventDefault();
    this.setState({
      message: "",
      loading: true
    });
    this.form.validateAll();
    if (this.checkBtn.context._errors.length === 0) {
		AuthService.login(this.state.email, this.state.password).then(
        (response) => {
			if(response.success === true)
			{
				this.props.history.push("/dashboard");
			}
			else
			{
				const resMessage = response.message;
				this.setState({
					loading: false,
					message: resMessage
			    });
			}
			
          
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );
		
      
    } else {
      this.setState({
        loading: false
      });
    }
  }
  render() {
    return (
	<div class="background no-footer ltr rounded">
	<div class="fixed-background"></div>
	<div class="container">
            <div class="row h-100">
                <div class="col-12 col-md-10 mx-auto my-auto">
                    <div class="card auth-card">
                        <div class="position-relative image-side ">
							<p class="text-white h2 login">Admin Login</p>
						</div>
                        <div class="form-side">
                            <span class="login-page-logo">
								<img width="100" alt="Profile Picture" src={require('../../../assets/img/logo/Frame@3x.png')} />
							</span>
                            <h6 class="mb-4">Login</h6>
                            <Form onSubmit={this.handleLogin} ref={c => {this.form = c;}}>
                                <label class="form-group has-float-label mb-4">
                                    <Input
										type="text"
										className="form-control"
										name="email"
										value={this.state.email}
										onChange={this.onChangeEmail}
										validations={[required]}
									  />
                                    <span>E-mail</span>
                                </label>

                                <label class="form-group has-float-label mb-4">
                                    <Input
										type="password"
										className="form-control"
										name="password"
										value={this.state.password}
										onChange={this.onChangePassword}
										validations={[required]}
									  />
                                    <span>Password</span>
                                </label>
                                <div class="d-flex justify-content-between align-items-center">
                                    <a href="#">Forget password?</a>
									<button	className="btn btn-primary btn-lg btn-shadow" disabled={this.state.loading}	>
										{this.state.loading && (
										  <span className="spinner-border spinner-border-sm"></span>
										)}
										<span>LOGIN</span>
									</button>
                                </div>
								{this.state.message && (
								  <div className="form-group">
									<div className="alert alert-danger" role="alert">
									  {this.state.message}
									</div>
								  </div>
								)}
								<CheckButton
								  style={{ display: "none" }}
								  ref={c => {
									this.checkBtn = c;
								  }}
								/>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
  }
}