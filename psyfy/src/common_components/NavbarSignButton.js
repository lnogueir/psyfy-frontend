import React from 'react';
import Badge from 'react-bootstrap/Badge';
import LoginCard from './LoginCard';
import Overlay from './Overlay';
import Utils from '../assets/js/Utils';
import Button from 'react-bootstrap/Button';

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
            >
              <LoginCard />
            </Overlay>
            <div className="justify-between w375">
              <p className="mt14 silver-color">Are you a doctor?</p>
              <a
                href="#"
                onClick={()=>this.toggleLogin('show_login_card', true)}
                className="login-button-nav"
              >
                Log in
              </a>
              <Button variant="outline-light">Request Account</Button>
            </div>
          </React.Fragment>
        );
      }
}


export default NavbarSignButton;
