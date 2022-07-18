import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { FormErrors } from './FormErrors';
import S3 from 'react-aws-s3';

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

class AddEditForm extends React.Component {
    
  constructor (props) {
    super(props);
    this.state = {
		id: 0,
		title: '',
		description: '',
		module: '',
		videourl: '',
		imageurl: '',
		placeholderimg: '',
		optvideo : false,
		optimage : false,
		formValid: true,
		modules_res: []
	}
  }
  
   onChange  = (e) => { 
    if(e.target.name == 'placeholderimg')
	{
		ReactS3Client
		.uploadFile(e.target.files[0], newFileName)
		.then(placeholderimg => {
			var placeholderimg = placeholderimg.location;
			this.setState({placeholderimg})
		})
		.catch(err => console.error(err))
	}
	else if(e.target.name=='videourl'){
		ReactS3Client
		.uploadFile(e.target.files[0], newFileName)
		.then(videourl => {
			var videourl = videourl.location;
			this.setState({videourl})
		})
		.catch(err => console.error(err))
	}
  else if(e.target.name=='imageurl'){
		ReactS3Client
		.uploadFile(e.target.files[0], newFileName)
		.then(imageurl => {
			var imageurl = imageurl.location;
			this.setState({imageurl})
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
  Choosemedia  = (e) => { 
    if(e.target.value == 'upvideo')
	{
		var optvideo = true
		var optimage = false
		var is_picture = 0;
		this.setState({optvideo});
		this.setState({optimage});
		this.setState({is_picture});
	}
	else
	{
		var optimage = true
		var optvideo = false
		var is_picture = 1;
		this.setState({optimage});
		this.setState({optvideo});
		this.setState({is_picture});
	}
    
                
  }
  

  validateField(fieldName, value) {
    var titleValid = this.state.titleValid;
	var descriptionValid = this.state.descriptionValid;
	var moduleValid = this.state.moduleValid;
	var videourlValid = this.state.videourlValid;
	var placeholderimgValid = this.state.placeholderimgValid;
	
	switch(fieldName) {
        case 'title':
        titleValid = value;
        titleValid = titleValid ? '': 'This is a required field';
        break;
		case 'description':
        descriptionValid = value;
        descriptionValid = descriptionValid ? '': 'This is a required field';
        break;
		case 'placeholderimg':
        placeholderimgValid = value;
        placeholderimgValid = placeholderimgValid ? '': 'This is a required field';
        break;
		case 'videourl':
        videourlValid = value;
        videourlValid = videourlValid ? '': 'This is a required field';
        break;
		case 'module':
        moduleValid = value;
        moduleValid = moduleValid ? '': 'This is a required field';
        break;
	 default:
        break;
    }
    this.setState({ titleValid: titleValid,
					descriptionValid: descriptionValid,
					placeholderimgValid: placeholderimgValid,
					videourlValid: videourlValid,
					moduleValid: moduleValid
				}, this.validateForm);
  }
  
  validateForm() {
	  if(this.state.titleValid == ''  && this.state.descriptionValid == '' && this.state.placeholderimgValid == '' && this.state.videourlValid == '' && this.state.moduleValid == '')
	  {
		  this.setState({ formValid: true })
	  }
	  else
	  {
		  this.setState({ formValid: true })
	  }
	  
    
  }

  submitFormAdd = e => {
    e.preventDefault()
    fetch(process.env.REACT_APP_API_URL+'education/module/save', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: this.state.title,
        description: this.state.description,
        placeholder_image: this.state.placeholderimg ? this.state.placeholderimg : this.props.item.placeholder_image,
		video_link: this.state.videourl ? this.state.videourl : this.state.imageurl,
        module_id: this.state.module ? this.state.module : this.props.item.module_id,
		is_picture: this.state.optvideo ? '0' : '1'
	  })
    })
      .then(response => response.json())
      .then(items => {
		  if(items.result_obj)
		  { 
			items = items.result_obj; this.setState({items})  
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
    fetch(process.env.REACT_APP_API_URL+'education/module/save/', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
		id: this.props.item._id,
        title: this.state.title,
        description: this.state.description,
        placeholder_image: this.state.placeholderimg ? this.state.placeholderimg : this.props.item.placeholder_image,
		video_link: this.state.videourl ? (this.state.videourl ? this.state.videourl : this.props.item.video_link) : (this.state.imageurl ? this.state.imageurl : this.props.item.video_link),
        module_id: this.state.module ? this.state.module : this.props.item.module_id,
		is_picture: this.state.optvideo ? '0' : '1'
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
	  this.getItems()
    // if item exists, populate the state with proper data
    if(this.props.item){
	  const { id, title, description, placeholderimg, videourl, module, placeholder_image,module_id,is_picture} = this.props.item
      this.setState({ id, title, description, placeholderimg, videourl, module, placeholder_image,module_id,is_picture})
    }
  }

  render() {
	let modules_data = this.state.modules_res;  
    return (
      <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
	    <FormGroup>
          <Label for="title">Title</Label>
          <Input type="title" name="title" id="title" onChange={this.onChange} value={this.state.title === null ? '' : this.state.title}  />
		  <p>{ this.state.titleValid }</p>
        </FormGroup>
		<FormGroup>
          <Label for="description">Description</Label>
          <Input type="text" name="description" id="description" onChange={this.onChange} value={this.state.description === null ? '' : this.state.description}  />
		  <p>{ this.state.descriptionValid }</p>
        </FormGroup>
		<FormGroup>
          <Label for="placeholderimg">Placeholder Image</Label>
          <Input type="file" name="placeholderimg" id="placeholderimg" onChange={this.onChange}  /> <img width="100" src={this.state.placeholderimg ? this.state.placeholderimg : this.state.placeholder_image} />
		  <p>{ this.state.placeholderimgValid }</p>
        </FormGroup>
		<FormGroup>
		<input checked={this.state.is_picture ==  '0' ? 'checked' : ''} value="upvideo" onChange={this.Choosemedia} type="radio" name="choosemedia" /> Upload Video OR &nbsp; 
		<input checked={this.state.is_picture == '1' ? 'checked' : ''} value="upimage" onChange={this.Choosemedia} type="radio" name="choosemedia" /> Upload Image 
		</FormGroup>
		{this.state.optvideo || this.state.is_picture === false  ? (
		<FormGroup>
          <Label for="videourl">Upload Video</Label>
          <Input type="file" name="videourl" id="videourl" onChange={this.onChange} /><img width="100" src={this.state.videourl ? this.state.videourl : this.state.placeholder_image} />
		  <p>{ this.state.videourlValid }</p>
        </FormGroup>
		) : (<div></div>)}
		{this.state.optimage || this.state.is_picture === true ? (
		<FormGroup>
          <Label for="imageurl">Upload Image</Label>
          <Input type="file" name="imageurl" id="imageurl" onChange={this.onChange} /><img width="100" src={this.state.imageurl ? this.state.imageurl : this.state.placeholder_image} />
		  <p>{ this.state.imageurlValid }</p>
        </FormGroup>
		) : (<div></div>)}
		<FormGroup>
          <Label for="module">Module</Label><br/>
		  <select name="module" onChange={this.onChange}>
		    {modules_data.map((Mres, i) => {
			 return(
			  <option selected={this.state.module_id == Mres._id ? 'selected' : '' } value={Mres._id}>{Mres.name}</option>
			 )
			})
		}
		  </select>
          <p>{ this.state.moduleValid }</p>
        </FormGroup>
        <Button disabled={!this.state.formValid}>Submit</Button>
      </Form>
    );
  }
}

export default AddEditForm