import React from 'react';
import { Switch, Redirect, Route } from 'react-router';
import { BrowserRouter, Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import S3 from 'react-aws-s3';
import { FormErrors } from './FormErrors';
import AuthService from "../../../Services/orgauth";
import Sidebar from "../Sidebar";
import Header from "../header";
window.Buffer = window.Buffer || require("buffer").Buffer;
const config = {
    bucketName: 'soulcial',
    dirName: 'media', /* optional */
    region: 'us-west-2',
    accessKeyId: 'AKIAUA5TRV5DKHJD3J4Y',
    secretAccessKey: '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',
    s3Url: 'https://soulcial.s3.us-west-2.amazonaws.com', /* optional */
}
const ReactS3Client = new S3(config);
const newFileName = '';

class Profile extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
		  currentUser: AuthService.getCurrentUser(),
		  logo: '',
		  themename: '',
		  themes: [],
		  message: ''
		};
	}
	onChange  = (e) => { 
	if(e.target.name == 'logo')
	{
		ReactS3Client
		.uploadFile(e.target.files[0], newFileName)
		.then(data => {
			data = data.location;
			this.setState({data})
		})
		.catch(err => console.error(err))
	}
	else
	{
		const name = e.target.name;
		const value = e.target.value;
		this.setState({[name]: value},
                  () => { this.validateField(name, value) });
	}		
    
  }
  
  validateField(fieldName, value) {
    var logoValid = this.state.logoValid;
    var themecolorValid = this.state.themecolorValid;
	switch(fieldName) {
        case 'logo':
        logoValid = value;
        logoValid = logoValid ? '': 'This is a required field';
        break;
		case 'themename':
        themecolorValid = value;
        themecolorValid = themecolorValid ? '': 'This is a required field';
        break;
	 default:
        break;
    }
    this.setState({ logoValid: logoValid,
                    themecolorValid: themecolorValid
				}, this.validateForm);
  }
  
  validateForm() {
	  if(this.state.logoValid == '' && this.state.themecolorValid == '')
	  {
		  this.setState({ formValid: true })
	  }
	  else
	  {
		  this.setState({ formValid: false })
	  }
	  
    
  }
  submitFormAdd = e => {
	let orgid = JSON.parse(localStorage.getItem('orguser')); 
    e.preventDefault()
	fetch(process.env.REACT_APP_API_URL+'organization/profile/update/'+orgid.organization._id, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        logo: this.state.data,
        themecode: this.state.themename
	  })
    })
      .then(response => response.json())
      .then(items => {
		  if(items.result)
		  { 
			items = items.result; 
			this.setState({items})
			this.setState({message: 'Profile Updated'})			
		  }
		  else {
			console.log('failure')
		  }
		}
		)
      .catch(err => console.log(err))
  }
  
  getItems(){
	  let orgid = JSON.parse(localStorage.getItem('orguser')); 
     fetch(process.env.REACT_APP_API_URL+'all/themes/',{
		 method: 'post',
		headers: {
        'Content-Type': 'application/json'
		}
	 })
      .then(response => response.json())
      .then(themes => {
		  if(themes.result)
		  { 
			themes = themes.result; 
			
			this.setState({themes})
			
		  }
		  else {
			console.log('failure')
		  }
		}
		)
      .catch(err => console.log(err))
  }
  
  componentDidMount = () => {
		let userstatus = JSON.parse(localStorage.getItem('orguser'));
		if (!userstatus) {
			this.props.history.push('/');
		} else {
			this.setState({ themename: userstatus.organization.themecode })
			this.setState({ logo: userstatus.organization.logo })
			this.setState({ userstatus: userstatus }, () => {
				this.getItems()
		});
		}
		
	       
	}
  
  render() {
	let themeres = this.state.themes;
	  
	return (
	<div class="container-fluid">
	  <Header />
	  <div class="main-container">
		<div class="menu left-panel">
				<Sidebar />
		</div>
      <div class="right-panel">
	  {this.state.message}
		<Form encType='multipart/form-data' onSubmit={this.submitFormAdd}>
		<FormGroup>
          <Label for="logo"><b>Upload Logo</b></Label>
          <Input onChange={this.onChange} accept=".png, .jpg, .jpeg" type="file" name="logo" id="logo" />
  <img width="100" src={this.state.data ? this.state.data : this.state.logo} />
		  <p>{ this.state.logoValid }</p>
        </FormGroup>
		<FormGroup>
		<div class="saas-system">
		<table class="headings">
		<tr>
		<th>Name</th>
		<th>Primary</th>
		<th>Secondary</th>
		<th>Text</th>
		</tr>
		{themeres.map((Tres, i) => {
			 return(
			  <tr>
			     <th><input type="radio" name="themename" checked={Tres._id == this.state.themename ? 'checked' : ''} value={Tres._id} onChange={this.onChange}/> {Tres.themeName}</th>
				 <td><span style={{background: Tres.primaryColor,borderRadius:'100%',height:'30px',width: '30px',float: 'left'}}></span></td>
				 <td><span style={{background: Tres.secondaryColor,borderRadius:'100%',height:'30px',width: '30px',float: 'left'}}></span></td>
				 <td><span style={{background: Tres.textColor,borderRadius:'100%',height:'30px',width: '30px',float: 'left'}}></span></td>
		      </tr>
			 )
			})
		}
		</table>
		<p>{ this.state.themecolorValid }</p>
		</div>
		</FormGroup>
        
        <Button>Submit</Button>
      </Form>
	  </div>
	  </div>
	  </div>
    );
  }
}

export default Profile