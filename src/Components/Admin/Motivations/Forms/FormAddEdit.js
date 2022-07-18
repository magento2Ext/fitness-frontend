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
		name: '',
		title: '',
		description: '',
		videourl: '',
		placeholderimg: '',
		video_duration: '',
                formValid: false
	}
  }
  
   onChange  = (e) => { 
    if(e.target.name == 'placeholderimg')
	{
		ReactS3Client
		.uploadFile(e.target.files[0], newFileName)
		.then(placeholderimg => {
			console.log(placeholderimg);
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
    else
	{
		const name = e.target.name;
		const value = e.target.value;
		this.setState({[name]: value},
                  () => { this.validateField(name, value) });
	}	
  }
  

  validateField(fieldName, value) {
    var nameValid = this.state.nameValid;
    var titleValid = this.state.titleValid;
	var descriptionValid = this.state.descriptionValid;
	var placeholderimgValid = this.state.placeholderimgValid;
	var videourlValid = this.state.videourlValid;
	var durationValid = this.state.durationValid;

    switch(fieldName) {
      case 'name':
        nameValid = value;
        nameValid = nameValid ? '': 'This is a required field';
        break;
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
		case 'video_duration':
        durationValid = value;
        durationValid = durationValid ? '': 'This is a required field';
        break;
	 default:
        break;
    }
    this.setState({ nameValid: nameValid,
                    titleValid: titleValid,
					descriptionValid: descriptionValid,
					placeholderimgValid: placeholderimgValid,
					videourlValid: videourlValid,
					durationValid: durationValid
				}, this.validateForm);
  }
  
  validateForm() {
	  if(this.state.nameValid == '' && this.state.titleValid == ''  && this.state.descriptionValid == '' && this.state.durationValid == '')
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
    fetch(process.env.REACT_APP_API_URL+'mvideos/save', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.name,
        title: this.state.title,
        description: this.state.description,
        placeholder_image: this.state.placeholderimg,
	video_link: this.state.videourl,
        video_duration: this.state.video_duration
	  })
    })
      .then(response => response.json())
      .then(items => {
		  if(items.result_obj)
		  { 
			items = items.result_obj; 
			this.setState({items})  
			console.log(items)
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
    fetch(process.env.REACT_APP_API_URL+'mvideos/save/', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: this.props.item._id,
        name: this.state.name,
        title: this.state.title,
        description: this.state.description,
        placeholder_image: this.state.placeholderimg ? this.state.placeholderimg : this.props.item.placeholder_image,
	video_link: this.state.videourl ? this.state.videourl : this.props.item.video_link,
        video_duration: this.state.video_duration
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
      const { id, name, title, description, video_duration, placeholder_image} = this.props.item
      this.setState({ id, name, title, description, video_duration, placeholder_image})
    }
  }

  render() {
	  
    return (
      <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
	    <FormGroup>
          <Label for="name">Name</Label>
          <Input type="text" name="name" id="name" onChange={this.onChange} value={this.state.name === null ? '' : this.state.name} />
		  <p>{ this.state.nameValid }</p>
        </FormGroup>
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
          <Input type="file" name="placeholderimg" id="placeholderimg" onChange={this.onChange}   /> <img width="100" src={this.state.placeholderimg ? this.state.placeholderimg : this.state.placeholder_image
} />
		  <p>{ this.state.placeholderimgValid }</p>
        </FormGroup>
		<FormGroup>
          <Label for="videourl">Video Link</Label>
          <Input type="file" name="videourl" id="videourl" onChange={this.onChange}   /><img width="100" src={this.state.videourl ? this.state.videourl : this.state.placeholder_image} />
		  <p>{ this.state.videourlValid }</p>
        </FormGroup>
		<FormGroup>
          <Label for="video_duration">Video Duration</Label>
          <Input type="text" name="video_duration" id="video_duration" onChange={this.onChange} value={this.state.video_duration === null ? '' : this.state.video_duration}  />
		  <p>{ this.state.durationValid }</p>
        </FormGroup>
        <Button disabled={this.props.item ? '' : !this.state.formValid}>Submit</Button>
      </Form>
    );
  }
}

export default AddEditForm