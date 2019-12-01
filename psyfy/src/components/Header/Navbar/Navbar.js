import React from 'react';
import NavbarSignButton from './NavbarSignButton';
import NavbarBrand from './NavbarBrand';



function Navbar(props) {
  return (
    <nav style={{ height: "87px" }} className="navbar navbar-expand-md navbar-light bg-psyfy-navbar">
      <NavbarBrand />
      <div className="collapse navbar-collapse" id="navbarSupportedContent"></div>
      <NavbarSignButton />
    </nav>
  )
}

export default Navbar;
