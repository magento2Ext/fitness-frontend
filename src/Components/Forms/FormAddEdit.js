import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { FormErrors } from './FormErrors';

class AddEditForm extends React.Component {
    
  constructor (props) {
    super(props);
    this.state = {
		id: 0,
		organizationName: '',
		password: '',
		email: '',
		zipCode: '',
		soul: '',
		mind: '',
		primaryColor: '',
		secondaryColor: '',
		textColor: '',
		modules: '',
		formValid: false,
		textColorValid: '',
		secondaryColorValid: '',
		primaryColorValid: '',
		zipCodeValid: '',
		passwordValid: '',
		emailValid: '',
		organizationNameValid: ''
    }
  }
  
   
  onChange  = (e) => { 
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
                  () => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {
    var emailValid = this.state.emailValid;
    var passwordValid = this.state.passwordValid;
	var organizationNameValid = this.state.organizationNameValid;
	var zipCodeValid = this.state.zipCodeValid;
	var primaryColorValid = this.state.primaryColorValid;
	var secondaryColorValid = this.state.secondaryColorValid;
	var textColorValid = this.state.textColorValid;

    switch(fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        emailValid = emailValid ? '' : fieldName+' is invalid';
        break;
      case 'password':
	    if(value == '')
		{
			passwordValid = 'This is a required field';
		}
		else if(value.length <= 6)
		{
			passwordValid = 'Password should be atleast 8 digits';
		}
		else
		{
			passwordValid = '';
		}
        break;
	  case 'organizationName':
        organizationNameValid = value;
        organizationNameValid = organizationNameValid ? '': 'This is a required field';
        break;
		case 'zipCode':
        zipCodeValid = value;
        zipCodeValid = zipCodeValid ? '': 'This is a required field';
        break;
		case 'primaryColor':
        primaryColorValid = value;
        primaryColorValid = primaryColorValid ? '': 'This is a required field';
        break;
		case 'secondaryColor':
        secondaryColorValid = value;
        secondaryColorValid = secondaryColorValid ? '': 'This is a required field';
        break;
		case 'textColor':
        textColorValid = value;
        textColorValid = textColorValid ? '': 'This is a required field';
        break;
      default:
        break;
    }
    this.setState({ emailValid: emailValid,
                    passwordValid: passwordValid,
					organizationNameValid: organizationNameValid,
					zipCodeValid: zipCodeValid,
					primaryColorValid: primaryColorValid,
					secondaryColorValid: secondaryColorValid,
					textColorValid: textColorValid
				}, this.validateForm);
  }
  
  validateForm() {
	  if(this.state.emailValid == '' && this.state.passwordValid == ''  && this.state.organizationNameValid == '' && this.state.zipCodeValid == '' && this.state.primaryColorValid == '' && this.state.secondaryColorValid == '' && this.state.textColorValid == '')
	  {
		  this.setState({ formValid: true })
	  }
	  else
	  {
		  this.setState({ formValid: false })
	  }
	  
    
  }

  submitFormAdd = e => {
    e.preventDefault()
    fetch(process.env.REACT_APP_API_URL+'organization/save', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        organizationName: this.state.organizationName,
        password: this.state.password,
        email: this.state.email,
        zipCode: this.state.zipCode,
        soul: this.state.soul,
        mind: this.state.mind,
		modules: 'soul,mind',
		primaryColor: this.state.primaryColor,
		secondaryColor: this.state.secondaryColor,
		textColor: this.state.textColor
      })
    })
      .then(response => response.json())
      .then(items => {
		  if(items.result)
		  { 
			items = items.result; this.setState({items})  
			this.props.addItemToState(items)
          this.props.toggle()
		  }
		  else {
			console.log('failure')
		  }
		}
		)
      .catch(err => console.log(err))
  }

  submitFormEdit = e => {
    e.preventDefault()
    fetch(process.env.REACT_APP_API_URL+'organization/update/'+this.props.item._id, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
		id: this.props.item._id,
        organizationName: this.state.organizationName,
        password: this.state.password,
        email: this.state.email,
        zipCode: this.state.zipCode,
        soul: this.state.soul,
        mind: this.state.mind,
		modules: 'soul,mind',
		primaryColor: this.state.primaryColor,
		secondaryColor: this.state.secondaryColor,
		textColor: this.state.textColor
      })
    })
      .then(response => response.json())
      .then(items => {
		  if(items.result_obj)
		  { 
			items = items.result_obj; 
			this.setState({items}) 
			this.props.updateState(items)			
			//this.props.addItemToState(items)
            this.props.toggle()
		  }
		  else {
			console.log('failure')
		  }
		}
		)
      .catch(err => console.log(err))
  }

  componentDidMount(){
    // if item exists, populate the state with proper data
    if(this.props.item){
	  const modules = this.props.item.modules
	  
		var s = this.props.item.modules;
		var match = s.split(',')
		const soul = match[0];
		const mind = match[1];
	  
      const { id, organizationName, password, email, zipCode, primaryColor, secondaryColor, textColor } = this.props.item
      this.setState({ id, organizationName, password,modules, email, zipCode, soul, mind, primaryColor, secondaryColor, textColor })
    }
  }

  render() {
    return (
      <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
	    <FormGroup>
          <Label for="organizationName">Name</Label>
          <Input type="text" name="organizationName" id="organizationName" onChange={this.onChange} value={this.state.organizationName === null ? '' : this.state.organizationName} />
		  <p>{ this.state.organizationNameValid }</p>
        </FormGroup>
		<FormGroup>
          <Label for="email">Email</Label>
          <Input type="email" name="email" id="email" onChange={this.onChange} value={this.state.email === null ? '' : this.state.email}  />
		  <p>{ this.state.emailValid }</p>
        </FormGroup>
		{this.props.item ? '' : <FormGroup>
          <Label for="password">Password</Label>
          <Input type="password" name="password" id="password" onChange={this.onChange} value={this.state.password === null ? '' : this.state.password}  />
		  <p>{ this.state.passwordValid }</p>
        </FormGroup>}
        
        <FormGroup>
          <Label for="zipCode">zipcode</Label>
          <Input type="text" name="zipCode" id="zipCode" onChange={this.onChange} value={this.state.zipCode === null ? '' : this.state.zipCode}  />
		  <p>{ this.state.zipCodeValid }</p>
        </FormGroup>
        <FormGroup>
          <Label for="soul">Modules</Label><br/>
          &nbsp;&nbsp;&nbsp;&nbsp;<Input type="checkbox" name="soul" id="soul" onChange={this.onChange} value={this.state.soul === null ? '' : this.state.soul}   />Soul<br/>
		   &nbsp;&nbsp;&nbsp;&nbsp;<Input type="checkbox" name="mind" id="mind" onChange={this.onChange} value='mind'   />Mind
        </FormGroup>
        <FormGroup>
          <Label for="primaryColor">Primary Color</Label>
          <Input type="color" name="primaryColor" id="primaryColor" onChange={this.onChange} value={this.state.primaryColor}  />
		  <p>{ this.state.primaryColorValid }</p>
        </FormGroup>
		<FormGroup>
          <Label for="secondaryColor">Secondary Color</Label>
          <Input type="color" name="secondaryColor" id="secondaryColor" onChange={this.onChange} value={this.state.secondaryColor}  />
		  <p>{ this.state.secondaryColorValid }</p>
        </FormGroup>
		<FormGroup>
          <Label for="textColor">Text Color</Label>
          <Input type="color" name="textColor" id="textColor" onChange={this.onChange} value={this.state.textColor}  />
		  <p>{ this.state.textColorValid }</p>
        </FormGroup>
        <Button disabled={!this.state.formValid}>Submit</Button>
      </Form>
    );
  }
}

export default AddEditForm