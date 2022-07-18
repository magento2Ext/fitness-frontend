import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import ModalForm from '../Modals/Modal'
import DataTable from '../Tables/DataTable'
import AuthService from "../../../Services/orgauth";
import { CSVLink } from "react-csv"
import Sidebar from "../Sidebar";
import Header from "../header";
class Organizations extends Component {
	constructor(props) {
		super(props);
		this.state = {
		  currentUser: AuthService.getCurrentUser(),
		  items: []
		};
	}
componentDidMount = () => {
		let token = JSON.parse(localStorage.getItem('orguser')); 
		
		if (!token) {
			this.props.history.push('/org-login');
		} else {
			this.setState({ token: token }, () => {
				this.getItems()
		});
		}
	}
  getItems(){
	  let orgid = JSON.parse(localStorage.getItem('orguser')); 
     fetch(process.env.REACT_APP_API_URL+'employee/list/'+orgid.organization._id)
      .then(response => response.json())
      .then(items => this.setState({items}))
      .catch(err => console.log(err))
  }

  addItemToState = (item) => {
    this.setState(prevState => ({
      items: [...prevState.items, item]
    }))
  }

  updateState = (item) => {
	const itemIndex = this.state.items.findIndex(data => data._id === item._id)
    const newArray = [
    // destructure all items from beginning to the indexed item
      ...this.state.items.slice(0, itemIndex),
    // add the updated item to the array
      item,
    // add the rest of the items to the array from the index after the replaced item
      ...this.state.items.slice(itemIndex + 1)
    ]
    this.setState({ items: newArray })
  }

  deleteItemFromState = (id) => {
    const updatedItems = this.state.items.filter(item => item._id !== id)
    this.setState({ items: updatedItems })
  }

  
  render() {
    return (
      <div className="container-fluid">
	    <Header />
		<div class="main-container">
			<div class="menu left-panel">
				<Sidebar />
			</div>
		<div class="right-panel">
		<Row>
          <Col>
            <CSVLink
              filename={"db.csv"}
              color="primary"
              style={{float: "right", marginRight: "10px"}}
              className="btn btn-primary"
              data={this.state.items}>
              Download CSV
            </CSVLink>
          </Col>
        </Row>
        <Row>
          <Col>
            <h1 style={{margin: "20px 0"}}>Employees</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <DataTable items={this.state.items} updateState={this.updateState} deleteItemFromState={this.deleteItemFromState} />
          </Col>
        </Row>
        
		</div>
		</div>
      </div>
    )
  }
	  
}
export default Organizations