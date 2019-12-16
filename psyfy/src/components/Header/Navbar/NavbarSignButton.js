import React from 'react';
import LoginCard from '../../Login/LoginCard';
import Overlay from '../../Overlay';
import Button from 'react-bootstrap/Button';
import NavbarSignButtonDropdown from './NavbarSignButtonDropdown';
import RequestAccountCard from '../../RequestAccount/RequestAccountCard';

class NavbarSignButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show_login_card: false,
      show_request_card: false
    }
  }

  toggleLogin = () => {
    this.setState(prevState => ({ show_login_card: !prevState.show_login_card }))
  }

  toggleRequest = () => {
    this.setState(prevState => ({ show_request_card: !prevState.show_request_card }))
  }


  render() {
    return (
      <React.Fragment>
        <Overlay
          toggleDisplay={this.toggleLogin}
          should_display={this.state.show_login_card}
          className={"overlay-content-login"}
        >
          <LoginCard toggleRequest={this.toggleRequest} />
        </Overlay>
        <Overlay
          toggleDisplay={this.toggleRequest}
          should_display={this.state.show_request_card}
          className={"overlay-content-request"}
        >
          <RequestAccountCard />
        </Overlay>
        <div className="d-sm-none">
          <NavbarSignButtonDropdown showRequestCard={this.toggleRequest} showLoginCard={this.toggleLogin} />
        </div>
        <div className="justify-around d-none d-sm-flex">
          <p className="mt14 mr15 silver-color">Are you a doctor?</p>
          <a
            href="#"
            onClick={this.toggleLogin}
            className="login-button-nav mr15"
          >
            Log in
              </a>
          <Button onClick={this.toggleRequest} style={{ height: '52px' }} variant="outline-light">
            Get Listed
          </Button>
        </div>
      </React.Fragment>
    );
  }
}


export default NavbarSignButton;
