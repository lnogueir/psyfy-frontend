import React from 'react';
import Card from 'react-bootstrap/Card';
import SweetAlert from 'sweetalert2-react';
import Utils from '../../assets/js/Utils';
import LoginForm from './LoginForm';
import Paper from '@material-ui/core/Paper'
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
        text={this.state.forgot_mode ?
          "A link to reset your password has been sent to your email." :
          "You have successfully logged in."}
        type='success'
        showCancelButton={false}
        showConfirmButton={false}
      /> :
      <Paper className="login-card box-shadow">
        <div className="mb40 mt10">
          <span className="login-card-title">{this.state.forgot_mode ? "Reset Password" : "Login to PsyCare"}</span>
        </div>
        {!this.state.forgot_mode ?
          <LoginForm updateState={this.updateState} /> :
          <ForgotPasswordForm updateState={this.updateState} />
        }
        <div className="mt40" >
          <Card.Footer className="bg-transparent text-muted">
            Are you a doctor?&nbsp;
              <a
              href="#"
              onClick={e => {
                e.preventDefault()
                this.props.toggleDisplay()
                this.props.toggleRequest()
              }}
            >
              Request an account
            </a>
          </Card.Footer>
        </div>
      </Paper>
    )
  }
}




export default LoginCard;
