import React from 'react'
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import { FaUserMd } from 'react-icons/fa';
import Utils from '../../assets/js/Utils';

class ForgotPasswordForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            is_loading: false,
            show_error: false
        }
    }

    componentWillUnmount = () => {
        Utils.Request.abortProcesses()
    }

    submitForgotPassword = e => {
        e.preventDefault()
        const target_email = e.target.elements.loginEmail.value
        this.setState({ is_loading: true })
        var req = new Utils.Request()
        const endpoint = "/site_profiles/customForgotPassword"
        setTimeout(() => {
            req.POST(endpoint, JSON.stringify({ email: target_email }))
                .then(response => {
                    if (response.status !== 200) {
                        this.setState({ is_loading: false, show_error: true })
                    }
                    else {
                        this.setState({ is_loading: false })
                        this.props.updateState('show_success', true)
                        setTimeout(() => window.location.reload(), 1300)
                    }
                })
                .catch(err => alert(Utils.ERROR_MESSAGE + err))
        }, 1000)
    }

    render() {
        return (
            <Form onSubmit={this.submitForgotPassword}>
                <div style={{ textAlign: "center" }}>
                    <span align="left" className="text-muted">
                        Please enter your email address and we'll send you a link to reset your password.
                    </span>
                    <Form.Group className="mt20" controlId="formBasicEmail">
                        <div className="mb-3">
                            <i className="login-input-icon" ><FaUserMd /></i>
                            <input type="text" name="loginEmail" className="login-input" placeholder="Login Email" />
                        </div>
                    </Form.Group>
                    <span className="text-muted">Remember your password? <a onClick={() => this.props.updateState('forgot_mode', false)} href="#">Login</a></span>
                    <div className="mt20">
                        {
                            this.state.is_loading ?
                                <Spinner className="mt30" animation="border" role="status" />
                                :
                                <button
                                    className="logbtn mt30"
                                    type="submit">
                                    Submit
                            </button>
                        }
                    </div>
                    {
                        this.state.show_error &&
                        <Alert className="mt20" variant={"danger"}>
                            Sorry, invalid <b>user email</b>.{'\n'}
                        </Alert>
                    }
                </div>
            </Form>
        )
    }

}

export default ForgotPasswordForm;