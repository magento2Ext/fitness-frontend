import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { FormErrors } from './FormErrors';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class AddEditForm extends React.Component {
    
  constructor (props) {
    super(props);
    this.state = {
		id: 0,
		organizationName: '',
		password: '',
		email: '',
		zipCode: '',
		soul: false,
		mind: false,
		modules: '',
		module_id: '',
		formValid: false,
		zipCodeValid: '',
		passwordValid: '',
		emailValid: '',
		organizationNameValid: '',
		modules_res: []
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
	var moduleValid = this.state.moduleValid;
	
	if(fieldName == 'soul' || fieldName == 'mind' || fieldName == 'body')
	{
		var selected = new Array();
		var chks = document.getElementsByTagName("INPUT");
		for (var i = 0; i < chks.length; i++) {
            if (chks[i].checked) {
                selected.push(chks[i].name);
            }
        }
		var modules = selected.join(",");
		if(modules)
		{
			moduleValid  = '';
		}
		else
		{
			moduleValid = "This is a required field";
		}
		
	}

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
	  default:
        break;
    }
    this.setState({ emailValid: emailValid,
                    passwordValid: passwordValid,
					organizationNameValid: organizationNameValid,
					zipCodeValid: zipCodeValid,
					moduleValid: moduleValid
				}, this.validateForm);
  }
  
  validateForm() { 

	  if(this.state.emailValid == '' && this.state.passwordValid == ''  && this.state.organizationNameValid == '' && this.state.zipCodeValid == '' && this.state.moduleValid == '')
	  {
		  this.setState({ formValid: true })
	  }
	  else
	  {
		  this.setState({ formValid: false })
	  }
	  
    
  }
  formcheck(name,value)
  {
	
	if(name == 'organizationName' && value =='')
	{
		this.setState({organizationNameValid : 'This is a required field'});  
	}
	else if(name == 'email' && value =='')
	{
		this.setState({emailValid : 'This is a required field'});  
	}
	else if(name == 'password' && value =='')
	{
		this.setState({passwordValid : 'This is a required field'});  
	}
	else if(name == 'zipCode' && value =='')
	{
		this.setState({zipCodeValid : 'This is a required field'});  
	}
	else if(name == 'soul' || name == 'mind' || name == 'body')
	{
		var selected = new Array();
		var chks = document.getElementsByTagName("INPUT");
		for (var i = 0; i < chks.length; i++) {
            if (chks[i].checked) {
                selected.push(chks[i].name);
            }
        }
		var modules = selected.join(",");
		if(modules)
		{
			this.setState({moduleValid : ''});  

		}
		else
		{
			this.setState({moduleValid : 'This is a required field'});  
		}
		
	}

		
  }
  submitFormAdd = e => {
    e.preventDefault()
	var selected = new Array();
	var selectedIds = new Array();
	var chks = document.getElementsByTagName("INPUT");
	for (var i = 0; i < chks.length; i++) {
            if (chks[i].checked) {
                selected.push(chks[i].name);
				selectedIds.push(chks[i].value);
            }
			this.formcheck(chks[i].name,chks[i].value);
			//this.setState({ [chks[i].name: 'This is a' })
        }
	var modules = selected.join(",");
	var moduleIds = selectedIds.join(",");
	if(this.state.formValid)
	{
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
		modules: modules,
		module_id: moduleIds
	  })
    })
      .then(response => response.json())
      .then(items => {
		  if(items.result)
		  { 
			toast("Record added successfully");
			items = items.result; this.setState({items});  console.log(items)
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
  }

  submitFormEdit = e => {
    e.preventDefault()
	
	var selected = new Array();
	var selectedIds = new Array();
	var chks = document.getElementsByTagName("INPUT");
	for (var i = 0; i < chks.length; i++) {
            if (chks[i].checked) {
                selected.push(chks[i].name);
				selectedIds.push(chks[i].value);
            }
			this.formcheck(chks[i].name,chks[i].value);
        }
	var modules = selected.join(",");
	var moduleIds = selectedIds.join(",");
	if(this.state.formValid)
	{
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
		modules: modules,
		module_id: moduleIds
      })
    })
      .then(response => response.json())
      .then(items => {
		  if(items.result_obj)
		  { 
			toast("Record updated successfully");
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
    
  }
  getItems(){
	  fetch(process.env.REACT_APP_API_URL+'module/list/',{
		 method: 'post',
		headers: {
        'Content-Type': 'application/json'
		}
	 })
      .then(response => response.json())
      .then(modules_res => {
		  if(modules_res.result)
		  { 
			modules_res = modules_res.result; 
			this.setState({modules_res})
			
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
	this.getItems()
    if(this.props.item){
	  	  
      const { id, organizationName, password, email, zipCode, module_id} = this.props.item
      this.setState({ id, organizationName, password, email, zipCode,module_id})
    }
  }

  render() {
	let modules_data = this.state.modules_res;
    return (
      <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
	   <ToastContainer />
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
		<Label for="soul">Modules</Label>
			{modules_data.map((Mres, i) => {
			 return(
			 <div class="all-modules">
			 <Input defaultChecked={this.state.module_id.includes(Mres._id) ? 'checked' : '' } type="checkbox" name={Mres.name} id={Mres.name} onChange={this.onChange} value={Mres._id}   /> {Mres.name} </div>
			  
			 )
			})
		}
		<p>{this.state.moduleValid}</p>
		</FormGroup>
		{this.props.item ? (
		<Button type="submit" onClick={this.onChange}>Submit</Button>
		 ) : (<Button>Submit</Button>)}
      </Form>
    );
  }
}

export default AddEditForm