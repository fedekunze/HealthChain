import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
class Navb extends Component {

  render() {
    return (
    <div className="nav-container">
    	<nav className="overlay-nav sticky-nav">
    		<Grid>
    			<Row>
    				<Col md={2}>
    					<a href="#top">
                <img alt="Navbar Logo" className="logo logo-dark" src={require("./img/hch.jpg")}/>
    					</a>
    				</Col>
    				<Col md={8} mdOffset={1} className="text-right">
    					<ul className="menu">
    						<li>
    							<a className="inner-link" href="#upload">Upload Data</a>
    						</li>
    						<li>
    							<a className="inner-link" href="#retrieve">Retrieve Data</a>
    						</li>
    					</ul>
    					<div className="mobile-menu-toggle">
    						<i className="icon icon_menu"></i>
    					</div>
    				</Col>
    			</Row>
    		</Grid>
    	</nav>
    </div>
    );
  }
}

export default Navb;
