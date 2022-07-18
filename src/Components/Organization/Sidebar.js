import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar'
class Sidebar extends React.Component {
    
  render() {
    return (
	 
	  <div class="main-menu">
		<div class="scroll">
			<PerfectScrollbar>
				<ul class="list-unstyled">
					<li>
						<Link to={"/org-profile"} className="nav-link">
						<i class="iconsminds-digital-drawing"></i> Profile
						</Link>
					</li>
					<li>
						<Link to={"/org-employees"} className="nav-link">
							<i class="iconsminds-air-balloon-1"></i> Employees
						</Link>
					</li>
				</ul>
			</PerfectScrollbar>
		</div>
	</div>
	  
	);
  }
}

export default Sidebar