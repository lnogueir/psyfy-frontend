import React from 'react'
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import { FaUserMd, FaLock } from 'react-icons/fa';
import Alert from 'react-bootstrap/Alert';
import Utils from '../../assets/js/Utils';



class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            is_loading: false,
            show_error: false,
        }
    }

    componentWillUnmount = () => {
        Utils.Request.abortProcesses()
    }

    handleLogin = event => {
        this.setState({ is_loading: true })
        event.preventDefault()
        const info = {
            email: event.target.elements.loginEmail.value,
            password: event.target.elements.password.value
        }
        const keepLoggedIn = event.target.elements.keepLoggedIn.checked
        var endpoint = "/site_users/login"
        var req = new Utils.Request()
        setTimeout(() => req.POST(endpoint, JSON.stringify(info)).then(response => response.json())
            .then(responseJson => {
                if (responseJson.error) {
                    this.setState({ is_loading: false, show_error: true })
                } else {
                    var token = responseJson.id
                    endpoint = `/site_users/${responseJson.userId}/loginDetails`
                    req.setAuthorization(token)
                    req.GET(endpoint).then(response => response.json())
                        .then(responseJson => {
                            this.props.updateState('forgot_mode', false)
                            this.props.updateState('show_success', true)
                            const loggedUser = {
                                token: token,
                                name: responseJson.result.full_name,
                                id: responseJson.result.profile_id,
                                image_uri: responseJson.result.profile_image.source_url + `?${Utils.getRandomNumber()}`
                            }
                            window.localStorage.clear()
                            window.sessionStorage.clear()
                            if (keepLoggedIn) {
                                window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser))
                            } else {
                                window.sessionStorage.setItem('loggedUser', JSON.stringify(loggedUser))
                            }
                            setTimeout(() => window.location.reload(), 1300)
                        }).catch(err => {
                            alert(Utils.ERROR_MESSAGE)
                        })
                }
            }).catch(err => {
                alert(Utils.ERROR_MESSAGE)
            }), 1000)
    }

    render() {
        return (
            <Form onSubmit={this.handleLogin}>
                <div style={{ textAlign: "center" }}>
                    <Form.Group controlId="formBasicEmail">
                        <div className="position-relative mb-3">
                            <i className="login-input-icon" ><FaUserMd /></i>
                            <input type="text" name="loginEmail" className="login-input" placeholder="Login Email" />
                        </div>
                    </Form.Group>
                    <Form.Group className="mt30" controlId="formBasicPassword">
                        <div className="position-relative mb-3">
                            <i className="login-input-icon" ><FaLock /></i>
                            <input type="password" name="password" className="login-input" placeholder="Password" />
                        </div>
                    </Form.Group>
                    <div className="justify-around flex-wrap">
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" name="keepLoggedIn" label="Keep me logged in" />
                        </Form.Group>
                        <a href="#" onClick={e => {
                            e.preventDefault()
                            this.props.updateState('forgot_mode', true)
                        }}
                        >
                            Forgot password
                        </a>
                    </div>
                    {
                        this.state.is_loading ?
                            <Spinner className="mt30" animation="border" role="status" />
                            :
                            <button
                                className="logbtn mt30"
                                type="submit">
                                Log In
                            </button>
                    }
                    {
                        this.state.show_error &&
                        <Alert className="mt20" variant={"danger"}>
                            Sorry, invalid <b>user email</b> or <b>password</b>.{'\n'}
                        </Alert>
                    }
                </div>
            </Form>
        )
    }
}

export default LoginForm;