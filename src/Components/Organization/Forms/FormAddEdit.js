import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { FormErrors } from './FormErrors';

class AddEditForm extends React.Component {
    
  constructor (props) {
    super(props);
    this.state = {
		id: 0,
		firstName: '',
		lastName: '',
		email: '',
		zipCode: '',
		is_exclusive: '',
		isVerified: '',
		formValid: false
	}
  }
  
   
  onChange  = (e) => { 
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
                  () => { this.validateField(name, value) });
  }
  
  
  
  validateField(fieldName, value) {
    var firstNameValid = this.state.firstNameValid;
	var lastNameValid = this.state.lastNameValid;
    var emailValid = this.state.emailValid;
	var zipCodeValid = this.state.zipCodeValid;
	var is_exclusiveValid = this.state.is_exclusiveValid;
	var isVerifiedValid = this.state.isVerifiedValid

    switch(fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        emailValid = emailValid ? '' : fieldName+' is invalid';
        break;
       case 'firstName':
        firstNameValid = value;
        firstNameValid = firstNameValid ? '': 'This is a required field';
        break;
		case 'lastName':
        lastNameValid = value;
        lastNameValid = lastNameValid ? '': 'This is a required field';
        break;
		case 'zipCode':
        zipCodeValid = value;
        zipCodeValid = zipCodeValid ? '': 'This is a required field';
        break;
		case 'is_exclusive':
		is_exclusiveValid = value;
        is_exclusiveValid = is_exclusiveValid ? '': 'This is a required field';
		case 'isVerifiedValid':
		isVerifiedValid = value;
        isVerifiedValid = isVerifiedValid ? '': 'This is a required field';
      default:
        break;
    }
    this.setState({ firstNameValid: firstNameValid,
					lastNameValid: lastNameValid,
					emailValid: emailValid,
					zipCodeValid: zipCodeValid,
					is_exclusiveValid: is_exclusiveValid,
					isVerifiedValid: isVerifiedValid
				}, this.validateForm);
  }
  
  validateForm() {
	  if(this.state.firstNameValid == '' && this.state.lastNameValid == '' && this.state.emailValid == '' && this.state.zipCodeValid == '' && this.state.is_exclusiveValid == '' && this.state.isVerifiedValid == '')
	  {
		  this.setState({ formValid: true })
	  }
	  else
	  {
		  this.setState({ formValid: false })
	  }
	  
    
  }

  submitFormEdit = e => {
    e.preventDefault()
    fetch(process.env.REACT_APP_API_URL+'employee/update/'+this.props.item._id, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
		id: this.props.item._id,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        zipCode: this.state.zipCode,
		is_exclusive: this.state.is_exclusive,
		isVerified: this.state.isVerified
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
	  const { id, firstName, lastName, email, zipCode, is_exclusive, isVerified } = this.props.item
      this.setState({ id, firstName, lastName,email, zipCode, is_exclusive, isVerified })
    }
  }

  render() {
    return (
      <Form onSubmit={this.submitFormEdit}>
	    <FormGroup>
          <Label for="firstName">First Name</Label>
          <Input type="text" name="firstName" id="firstName" onChange={this.onChange} value={this.state.firstName === null ? '' : this.state.firstName} />
		  <p>{ this.state.firstNameValid }</p>
        </FormGroup>
		<FormGroup>
          <Label for="lastName">Last Name</Label>
          <Input type="text" name="lastName" id="lastName" onChange={this.onChange} value={this.state.lastName === null ? '' : this.state.lastName} />
		  <p>{ this.state.lastNameValid }</p>
        </FormGroup>
		<FormGroup>
          <Label for="email">Email</Label>
          <Input type="email" name="email" id="email" onChange={this.onChange} value={this.state.email === null ? '' : this.state.email}  />
		  <p>{ this.state.emailValid }</p>
        </FormGroup>
		<FormGroup>
          <Label for="zipCode">zipcode</Label>
          <Input type="text" name="zipCode" id="zipCode" onChange={this.onChange} value={this.state.zipCode === null ? '' : this.state.zipCode}  />
		  <p>{ this.state.zipCodeValid }</p>
        </FormGroup>
		<FormGroup>
          <Label for="is_exclusive">Is Exclusive</Label>
		  <select value={this.state.is_exclusive} name="is_exclusive" onChange={this.onChange}>
			<option value="true">Exclusive</option>
			<option value="false">Non Exclusive</option>
		  </select>
          <p>{ this.state.is_exclusiveValid }</p>
        </FormGroup>
		<FormGroup>
          <Label for="isVerified">Is Verified</Label>
		  <select value={this.state.isVerified} name="isVerified" onChange={this.onChange}>
			<option value="true">Approve</option>
			<option value="false">Disapprove</option>
		  </select>
          <p>{ this.state.isVerifiedValid }</p>
        </FormGroup>
        <Button >Submit</Button>
      </Form>
    );
  }
}

export default AddEditForm