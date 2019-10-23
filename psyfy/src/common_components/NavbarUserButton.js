import React from 'react';
import Badge from 'react-bootstrap/Badge';
import NavbarUserButtonDropdown from './NavbarUserButtonDropdown';

function NavbarUserButton(props){
  return (
    <NavbarUserButtonDropdown>
      <a className="text-bold-white" href="#">
        <div className="bg-white-on-hover border-2 border rounded p6 m5">
            <img className="rounded-circle bg-light d-inline-block box-shadow" style={{width:45, height:45}} src={props.image_uri!=null?props.image_uri:require("../assets/images/profile_fill.png")}/>
            <span className="d-inline-block p-2 mr-3">|&nbsp;&nbsp; {props.name} &nbsp;&nbsp;|</span>
            <Badge className="d-inline-block p-2 mr-3" pill variant="primary">9</Badge>
        </div>
      </a>
    </NavbarUserButtonDropdown>
  );
}

export default NavbarUserButton;
