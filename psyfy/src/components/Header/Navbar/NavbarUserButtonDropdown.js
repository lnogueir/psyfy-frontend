import React from 'react'
import Utils from '../../../assets/js/Utils'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';

class NavbarUserButtonDropdown extends React.Component {

  componentWillUnmount = () => {
    Utils.Request.abortProcesses()
  }

  handleLogout = () => {
    var req = new Utils.Request()
    const endpoint = "/site_users/logout"
    const correct_storage = window.localStorage.getItem('loggedUser') || window.sessionStorage.getItem('loggedUser')
    const token = JSON.parse(correct_storage).token
    req.setAuthorization(token)
    const data = {
      access_token: token
    }
    req.POST(endpoint, JSON.stringify(data))
      .then(response => {
        if (response.status === 204) {
          Utils.logout()
        } else {
          alert(Utils.ERROR_MESSAGE)
        }
      })

  }

  render() {
    return (
      <div className="nav-item dropdown">
        <span data-toggle="dropdown" className="d-sm-none">
          <a href="#">
            <Button style={{ height: '52px', width: '100px' }} variant="outline-light">
              {this.props.children}
            </Button>
          </a>
        </span>
        <span data-toggle="dropdown" className="d-none d-sm-block">
          <a href="#">
            {this.props.children}
          </a>
        </span>
        <div
          style={{ marginLeft: 5, marginTop: -1 }}
          id="dropdown-nav"
          className="dropdown-menu responsive-dropdown-logged-navbar"
        >
          <Link className="dropdown-item" to='/overview'>
            My Overview
          </Link>
          <Link to='/calendar'>
            <a href="#" className="dropdown-item">
              My Calendar
            </a>
          </Link>
          <Link to="/manage_credentials">
            <a className="dropdown-item" href="#">
              Manage Credentials
                </a>
          </Link>

          <div className="dropdown-divider"></div>
          <a
            style={{ color: "red" }}
            className="dropdown-item pointer"
            onClick={this.handleLogout}
          >
            Logout
              </a>
        </div>
      </div>
    )
  }
}

export default NavbarUserButtonDropdown;
