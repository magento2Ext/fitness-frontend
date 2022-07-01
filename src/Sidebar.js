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
						<Link to={"/motivational-videos"} className="nav-link">
							<i class="iconsminds-pantone"></i> Motivational Videos
						</Link>
					</li>
					<li>
						<a href="#menu">
							<i class="iconsminds-three-arrow-fork"></i> Menu
						</a>
					</li>
					<li>
						<a href="Blank.Page.html">
							<i class="iconsminds-bucket"></i> Blank Page
						</a>
					</li>
					<li>
						<a href="https://dore-jquery-docs.coloredstrategies.com">
							<i class="iconsminds-library"></i> Docs
						</a>
					</li>
				</ul>
			</PerfectScrollbar>
		</div>
	</div>
	  
	);
  }
}

export default Sidebar