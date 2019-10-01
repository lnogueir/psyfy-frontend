import React from 'react';
import Badge from 'react-bootstrap/Badge';


function Navbar(props){
  const image_src = props.image_src
    return (
      <nav className="navbar navbar-expand-md navbar-light bg-psyfy-navbar">
        <a className="navbar-brand" href="#">Psyfy</a>
        <div id="hide-left-for-40">
          <a className="text-bold-black" href="#">
            <div className="row">
              <div className="border rounded bg-light p6 m5">
                <img className="rounded-circle bg-light d-inline-block p-2 mr-3" width={40} height={40} src={require("../assets/images/profile_fill.png")}/>
                <span className="d-inline-block p-2 mr-3">|&nbsp;&nbsp; {props.name} &nbsp;&nbsp;|</span>
                <Badge className="d-inline-block p-2 mr-3" pill variant="primary">9</Badge>
              </div>
            </div>
          </a>
        </div>
        <button id="toggle-button" className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Link</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Dropdown
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#">Action</a>
                <a className="dropdown-item" href="#">Another action</a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">Something else here</a>
              </div>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Disabled</a>
            </li>
          </ul>
        </div>
        <div id="display-right-for-40">
          <a className="text-bold-white" href="#">
            <div className="bg-white-on-hover border-2 border rounded p6 m5">
                <img className="rounded-circle bg-light d-inline-block p-2 mr-3" width={40} height={40} src={require("../assets/images/profile_fill.png")}/>
                <span className="d-inline-block p-2 mr-3">|&nbsp;&nbsp; {props.name} &nbsp;&nbsp;|</span>
                <Badge className="d-inline-block p-2 mr-3" pill variant="primary">9</Badge>
            </div>
          </a>
        </div>
      </nav>
    )

}

export default Navbar;
