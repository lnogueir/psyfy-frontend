import React from 'react';
import NavbarUserButton from './NavbarUserButton';
import NavbarSignButton from './NavbarSignButton'
import Utils from '../assets/js/Utils';


function Navbar(props){
    return (
      <nav style={{height:"87px"}} className="navbar navbar-expand-md navbar-light bg-psyfy-navbar">
        <a className="navbar-brand" href="#">Psyfy</a>
        <div className="collapse navbar-collapse" id="navbarSupportedContent"></div>
        <NavbarSignButton />
      </nav>
    )
}

export default Navbar;
