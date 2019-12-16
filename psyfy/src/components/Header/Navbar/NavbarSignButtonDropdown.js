import React from 'react'
import Button from 'react-bootstrap/Button';
import MoreIcon from '@material-ui/icons/MoreHoriz'

function NavbarSignButtonDropdown(props) {
    return (
        <div className="nav-item dropdown" >
            <a href="#" data-toggle="dropdown">
                <Button style={{ height: '52px', width: '100px' }} variant="outline-light">
                    <MoreIcon />
                </Button>
            </a>
            <div id="dropdown-nav" className="sign-dropdown dropdown-menu">
                <span className="dropdown-item">Are you a doctor?</span>
                <div className="dropdown-divider"></div>
                <a href="#" className="dropdown-item" onClick={props.showLoginCard}>Login</a>
                <a href="#" className="dropdown-item" onClick={props.showRequestCard}>
                    Get Listed
                </a>
            </div>
        </div>
    )
}

export default NavbarSignButtonDropdown;