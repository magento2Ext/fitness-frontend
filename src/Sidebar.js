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
						<a class="active" href="#dashboard">
							<Link to={"/dashboard"} className="nav-link">
								<i class="iconsminds-shop-4"></i> Dashboards
							</Link>
						</a>
					</li>
					<li>
						<Link to={"/organizations-list"} className="nav-link">
						<i class="iconsminds-digital-drawing"></i> Organizations
						</Link>
					</li>
					<li>
						<Link to={"/employees"} className="nav-link">
							<i class="iconsminds-air-balloon-1"></i> Employees
						</Link>
					</li>
					<li>
						<Link to={"/motivations"} className="nav-link">
							<i class="iconsminds-pantone"></i> Motivations
						</Link>
					</li>
					<li>
						<Link to={"/education"} className="nav-link">
							<i class="iconsminds-pantone"></i> Education
						</Link>
					</li>
					<li>
						<Link to={"/teachers"} className="nav-link">
							<i class="iconsminds-pantone"></i> Guided Yoga
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