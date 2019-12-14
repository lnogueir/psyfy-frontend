import React from 'react';
import NavbarUserButtonDropdown from './NavbarUserButtonDropdown';
import Utils from '../../../assets/js/Utils';

function NavbarUserButton(props) {
  return (
    <NavbarUserButtonDropdown>
      <a className="text-bold-white" href="#">
        <div id="user-button-nav" className="d-none d-sm-block bg-white-on-hover border-2 border rounded p6 m5">
          <img className="rounded-circle bg-light d-inline-block box-shadow" style={{ width: 45, height: 45 }} src={props.image_uri != null ? props.image_uri : require("../../../assets/images/profile_fill.png")} />
          <span className="d-inline-block p-2 mr-3">&nbsp;&nbsp;{Utils.getSplittedFullName(props.name)}</span>
        </div>
        <span className="d-sm-none">
          <img
            className="rounded-circle bg-light d-inline-block box-shadow"
            style={{ position: 'relative', bottom: '3px', width: 45, height: 45 }}
            src={props.image_uri != null ? props.image_uri : require("../../../assets/images/profile_fill.png")}
          />
        </span>
      </a>
    </NavbarUserButtonDropdown>
  );
}

export default NavbarUserButton;
