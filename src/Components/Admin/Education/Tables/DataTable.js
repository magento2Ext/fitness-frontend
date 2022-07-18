import React, { useState, useMemo, Component } from 'react';
import { Table, Button } from 'reactstrap';
import ModalForm from '../Modals/Modal'
import {MDBCard, MDBCardHeader, MDBCardTitle, MDBCardBody, MDBCardText} from "mdbreact";
import ReactPaginate from 'react-paginate';
import '../../../../assets/css/paginate.css';

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
      fetch(process.env.REACT_APP_API_URL+'education/module/delete/', {
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
            <th>Title</th>
            <th>Description</th>
			<th>Placeholder Image</th>
			<th>Image</th>
			<th>Video</th>
            <th>Module</th>
			<th>Action</th>
          </tr>
        </thead>
        <tbody>
          
       
                  {items.map((item, i) => {
                    var length = 20;
                    var description = item.description.substring(0, length);
                      return (
                         <tr key={item._id}>
						  <th scope="row">{i + pagenum}</th>
						  <td>{item.title}</td>
						  <td>{description}</td>
						  <td><img width="100" src={item.placeholder_image} /></td>
						  <td><img width="100" src={item.video_link} /></td>
						  <td><img width="100" src={item.video_link} /></td>
						  <td>{item.module_name}</td>
						  <td>
							<div style={{width:"110px"}}>
							  <ModalForm buttonLabel="Edit" item={item}  updateState={this.props.updateState}/>
							  {' '}
							  <Button color="danger" onClick={() => this.deleteItem(item.id)}>Del</Button>
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