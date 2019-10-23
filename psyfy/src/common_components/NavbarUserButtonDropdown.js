import React from 'react'
import Utils from '../assets/js/Utils'
import { Link, Redirect } from 'react-router-dom'

class NavbarUserButtonDropdown extends React.Component{
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
      .then(response=>{
        if(response.status === 204){
          window.localStorage.clear();
          window.sessionStorage.clear()
          window.location.reload();
        }else{
          alert(Utils.ERROR_MESSAGE)
        }
      })

    }

    render(){
        return(
          <div className="nav-item dropdown">
            <a href="#" data-toggle="dropdown">
                {this.props.children}
            </a>
            <div style={{marginLeft:5,marginTop:-1, width:250}} className="dropdown-menu">
              <Link className="dropdown-item" to='/overview'>
                  My Overview
              </Link>
              <a className="dropdown-item" href="#">Manage Credentials</a>
              <div className="dropdown-divider"></div>
              <Link to="/">
                <a
                  style={{color:"red"}}
                  className="dropdown-item"
                  onClick={this.handleLogout}
                >
                  Logout
                </a>
              </Link>
            </div>
          </div>
        )
    }
}

export default NavbarUserButtonDropdown;
