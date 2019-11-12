import React from 'react';
import Badge from 'react-bootstrap/Badge';
import LoginCard from './LoginCard';
import Overlay from './Overlay';
import Utils from '../assets/js/Utils';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

class NavbarSignButton extends React.Component{
  constructor(props){
    super(props)
    this.state = {
        show_login_card: false
    }
  }

  toggleLogin = () => {
    this.setState(prevState => ({show_login_card: !prevState.show_login_card}))
  }


    render()
      {
        return (
          <React.Fragment>
            <Overlay
              toggleDisplay={this.toggleLogin}
              should_display={this.state.show_login_card}
              className={"overlay-content-login"}
            >
              <LoginCard />
            </Overlay>
            <div className="justify-between w375">
              <p className="mt14 silver-color">Are you a doctor?</p>
              <a
                href="#"
                onClick={e=>{
                  e.preventDefault()
                  this.toggleLogin('show_login_card', true)
                }}
                className="login-button-nav"
              >
                Log in
              </a>
              <Link to="/request_account">
                  <Button style={{height:'52px'}} variant="outline-light">
                      Request Account
                  </Button>
              </Link>
            </div>
          </React.Fragment>
        );
      }
}


export default NavbarSignButton;
