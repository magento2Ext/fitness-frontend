import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import DataTable from './Tables/DataTable'
import AuthService from "../../../Services/auth.service";
import { CSVLink } from "react-csv"
import Sidebar from "../../../Sidebar";
import Header from "../../../header";
class Employees extends Component {
	constructor(props) {
		super(props);
		this.state = {
		  currentUser: AuthService.getCurrentUser(),
		  items: []
		};
	}
componentDidMount = () => {
		let token = JSON.parse(localStorage.getItem('user'));
		if (!token) {
			this.props.history.push('/');
		} else {
			this.setState({ token: token }, () => {
				this.getItems()
		});
		}
	}
  getItems(){
    fetch(process.env.REACT_APP_API_URL+'employee/list')
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
    const itemIndex = this.state.items.findIndex(data => data.id === item._id)
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
            <h1 style={{margin: "20px 0"}}>Employees List</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <DataTable items={this.state.items} updateState={this.updateState} deleteItemFromState={this.deleteItemFromState} />
          </Col>
        </Row>
        <Row>
          <Col>
            <CSVLink
              filename={"db.csv"}
              color="primary"
              style={{float: "left", marginRight: "10px"}}
              className="btn btn-primary"
              data={this.state.items}>
              Download CSV
            </CSVLink>
            
          </Col>
        </Row>
		</div>
		</div>
      </div>
    )
  }
	  
}
export default Employees