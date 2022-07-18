import React, { useState, useMemo, Component } from 'react';
import { Table, Button } from 'reactstrap';
import {MDBCard, MDBCardHeader, MDBCardTitle, MDBCardBody, MDBCardText} from "mdbreact";
import ReactPaginate from 'react-paginate';
import '../../../../assets/css/paginate.css';
let PageSize = 10;

class DataTable extends Component {
   constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
	  setCurrentPage: 1,
	  perPage: 4,
      page: 0,
      pages: 0
    };
  }
  
   
   
	handlePageClick = (event) => {
        let page = event.selected;
        this.setState({page})
    }
  deleteItem = id => {
	let confirmDelete = window.confirm('Delete item forever?')
    if(confirmDelete){
      fetch(process.env.REACT_APP_API_URL+'organization/delete/'+id, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id
      })
    })
      .then(response => response.json())
      .then(item => {
        this.props.deleteItemFromState(id)
      })
      .catch(err => console.log(err))
    }

  }
   
  render() {
      const {page, perPage} = this.state;
	  const pages = Math.floor(this.props.items.length / this.state.perPage)
      let items = this.props.items.slice(page * perPage, (page + 1) * perPage);

      return (
	  <div>
          <Table responsive hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Email</th>
            <th>Username</th>
            <th>Zipcode</th>
            <th>Employee Type</th>
            <th>Is Exclusive</th>
			<th>Action</th>
          </tr>
        </thead>
        <tbody>
          
       
                  {items.map((item, i) => {
                      return (
                         <tr key={item._id}>
						  <th scope="row">{i + 1}</th>
						  <td>{item.firstName}</td>
						  <td>{item.lastName}</td>
						  <td>{item.email}</td>
						  <td>{item.userName}</td>
						  <td>{item.zipCode}</td>
						  <td>{item.employeeType}</td>
						  <td>{item.is_exclusive}</td>
						  <td>
							<div style={{width:"110px"}}>
							  <Button color="danger" onClick={() => this.deleteItem(item._id)}>Del</Button>
							</div>
						  </td>
						</tr> 
                      )
                  })
                  }
				   </tbody>
                </Table>
                  <div className="pagination-txt">Display {this.state.perPage} of {this.props.items.length} relevant
                      jobs
                  </div>
                  <div className="float-end">
                      <ReactPaginate
                          previousLabel={'<<'}
                          nextLabel={'>>'}
                          pageCount={pages}
                          onPageChange={this.handlePageClick}
                          containerClassName={'pagination'}
                          activeClassName={'active'}
                      />
                  </div>
              </div>
         
      );
  } 
   
   
  
}

export default DataTable