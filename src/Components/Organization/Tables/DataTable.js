import React, { useState, useMemo, Component } from 'react';
import { Table, Button } from 'reactstrap';
import ModalForm from '../Modals/Modal'
import {MDBCard, MDBCardHeader, MDBCardTitle, MDBCardBody, MDBCardText} from "mdbreact";
import ReactPaginate from 'react-paginate';
import '../../../assets/css/paginate.css';

class DataTable extends Component {
   constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
	  setCurrentPage: 1,
	  perPage: 5,
      page: 0,
      pages: 0,
	  pagenum: 1
    };
  }
  
   
   
	handlePageClick = (event) => {
        let page = event.selected;
		if(page > 0)
		{
			var pagenum = (this.state.perPage*page)+1;
		}
		else
		{
			var pagenum = 1;
		}
		
		this.setState({page})
		this.setState({pagenum})
    }
  deleteItem = id => {
	let confirmDelete = window.confirm('Delete item forever?')
    if(confirmDelete){
      fetch(process.env.REACT_APP_API_URL+'employee/delete', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id
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
      const {page, perPage, pagenum} = this.state;
	  const pages = Math.ceil(this.props.items.length / this.state.perPage)
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
            <th>Status</th>
            <th>Is Exclusive</th>
			<th>Action</th>
          </tr>
        </thead>
        <tbody>
          
       
                  {items.map((item, i) => {
                      return (
                         <tr key={item._id}>
						  <th scope="row">{i + pagenum}</th>
						  <td>{item.firstName}</td>
						  <td>{item.lastName}</td>
						  <td>{item.email}</td>
						  <td>{item.userName}</td>
						  <td>{item.zipCode}</td>
						  <td>{item.isVerified ? 'Approved' : 'Disapproved'}</td>
						  <td>{item.is_exclusive ? 'Exclusive' : 'Non Exclusive'}</td>
						  <td>
							<div style={{width:"110px"}}>
							  <ModalForm buttonLabel="Edit" item={item}  updateState={this.props.updateState}/>
							  {' '}
							  <Button color="danger" onClick={() => this.deleteItem(item._id)}>Del</Button>
							</div>
						  </td>
						</tr> 
                      )
                  })
                  }
				   </tbody>
                </Table>
                  <div className="pagination-txt">Total Records: {this.props.items.length} </div>
				  {this.props.items.length > this.state.perPage ? (
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
				  ) : (<div></div>)}
              </div>
         
      );
  } 
   
   
  
}

export default DataTable