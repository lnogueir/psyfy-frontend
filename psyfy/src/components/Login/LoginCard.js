import React from 'react';
import Card from 'react-bootstrap/Card';
import SweetAlert from 'sweetalert2-react';
import Utils from '../../assets/js/Utils';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';
import ForgotPasswordForm from './ForgotPasswordForm';



class LoginCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      is_loading: false,
      show_success: false,
      forgot_mode: false
    }
    this.updateState = Utils.updateStateField.bind(this)
  }


  render() {
    return (this.state.show_success ?
      <SweetAlert show={this.state.show_success}
        title={this.state.forgot_mode ? "Email Sent" : "Welcome back!"}
        text="A link to reset your password has been sent to your email."
        type='success'
        showCancelButton={false}
        showConfirmButton={false}
      /> :
      <Card className="login-card box-shadow">
        <div className="mb40 mt10">
          <span className="login-card-title">{this.state.forgot_mode ? "Reset Password" : "Login to PsyCare"}</span>
        </div>
        {!this.state.forgot_mode ?
          <LoginForm updateState={this.updateState} /> :
          <ForgotPasswordForm updateState={this.updateState} />
        }
        <div className="mt40" >
          <Card.Footer className="bg-transparent text-muted">Are you a doctor? <Link onClick={this.props.toggleDisplay} to="/request_account"><a href="#">Request an account</a></Link></Card.Footer>
        </div>
      </Card>
    )
  }
}




export default LoginCard;
