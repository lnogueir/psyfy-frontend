import React from 'react';
import LoginCard from '../../Login/LoginCard';
import Overlay from '../../Overlay';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import NavbarSignButtonDropdown from './NavbarSignButtonDropdown';

class NavbarSignButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show_login_card: false
    }
    this.showLoginCard = () => this.setState({ show_login_card: true })
  }

  toggleLogin = () => {
    this.setState(prevState => ({ show_login_card: !prevState.show_login_card }))
  }


  render() {
    return (
      <React.Fragment>
        <Overlay
          toggleDisplay={this.toggleLogin}
          should_display={this.state.show_login_card}
          className={"overlay-content-login"}
        >
          <LoginCard />
        </Overlay>
        <div className="d-sm-none">
          <NavbarSignButtonDropdown showLoginCard={this.showLoginCard} />
        </div>
        <div className="justify-around d-none d-sm-flex">
          <p className="mt14 mr15 silver-color">Are you a doctor?</p>
          <a
            href="#"
            onClick={e => {
              e.preventDefault()
              this.toggleLogin('show_login_card', true)
            }}
            className="login-button-nav mr15"
          >
            Log in
              </a>
          <Link to="/request_account">
            <Button style={{ height: '52px' }} variant="outline-light">
              Request Account
            </Button>
          </Link>
        </div>
      </React.Fragment>
    );
  }
}


export default NavbarSignButton;
