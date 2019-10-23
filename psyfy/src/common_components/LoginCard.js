import React from 'react';
import '../assets/common_style.css';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import SweetAlert from 'sweetalert2-react';
import { FaUserMd, FaLock } from 'react-icons/fa';
import Utils from '../assets/js/Utils'


class LoginCard extends React.Component{
    constructor(props){
    super(props);
    this.state = {
          is_loading: false,
          show_error: false,
          show_success:false
        }
    }

    handleUpdate=(event)=>{
        event.preventDefault()
        if(event.target.elements.password.value != this.state.password){
            this.setState({errorAlertShow: true })
        }else{
            this.setState({successAlertShow: true })

        }
    }


    handleLogin = (event) => {
      this.setState({is_loading:true})
      event.preventDefault()
      const info = {
          email: event.target.elements.loginEmail.value,
          password: event.target.elements.password.value
      }
      const keepLoggedIn = event.target.elements.keepLoggedIn.checked
      var endpoint = "/site_users/login"
      var req = new Utils.Request()
      setTimeout(()=>req.POST(endpoint, JSON.stringify(info)).then(response=>response.json())
      .then(responseJson=>{
        if(responseJson.error){
          this.setState({is_loading:false, show_error: true})
        }else{
          var token = responseJson.id
          endpoint = `/site_users/${responseJson.userId}/loginDetails`
          req.setAuthorization(token)
          req.GET(endpoint).then(response=>response.json())
          .then(responseJson=>{
            this.setState({show_success:true})
            const loggedUser = {
              token: token,
              name: responseJson.result.full_name,
              id: responseJson.result.profile_id,
              image_uri: responseJson.result.profile_image.source_url
            }
            window.localStorage.clear()
            window.sessionStorage.clear()
            if(keepLoggedIn){
                window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser))
            }else{
                window.sessionStorage.setItem('loggedUser', JSON.stringify(loggedUser))
            }
            setTimeout(()=>window.location.reload(), 1300)
          }).catch(err=>{
              alert(Utils.ERROR_MESSAGE)
          })
        }
      }).catch(err=>{
          alert(Utils.ERROR_MESSAGE)
      }), 1000)

    }

    render(){
      return ( this.state.show_success ?
        <SweetAlert show={this.state.show_success} title="Welcome back!"
          text="You have successfully logged in."
          type='success'
          showCancelButton={false}
          showConfirmButton={false}
        /> :
        <div onClick={(e)=>e.stopPropagation()} className="overlay-content-login">
          <Card className="login-card box-shadow">
              <div className="mb40 mt10">
                  <h3>Psyfy Login</h3>
              </div>
              <Form onSubmit={this.handleLogin} >
                  <div style={{textAlign:"center"}}>
                      <Form.Group controlId="formBasicEmail">
                          <div style={{position:'relative'}} className="input-group mb-3">
                              <i className="login-input-icon" ><FaUserMd /></i>
                              <input type="text" name="loginEmail" className="form-control login-input" placeholder="Login Email" />
                          </div>
                      </Form.Group>
                      <Form.Group className="mt30" controlId="formBasicPassword">
                          <div style={{position:'relative'}} className="input-group mb-3">
                              <i className="login-input-icon" ><FaLock /></i>
                              <input type="password" name="password" className="form-control login-input" placeholder="Password" />
                          </div>
                      </Form.Group>
                      <div className="justify-around">
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" name="keepLoggedIn" label="Keep me logged in" />
                        </Form.Group>
                        <a href="#">Forgot password</a>
                      </div>
                      {
                        this.state.is_loading?
                        <Spinner className="mt30" animation="border" role="status"/>
                        :
                        <button
                          className="logbtn mt30"
                          type="submit"  >
                            Log In
                        </button>
                      }
                      {
                        this.state.show_error &&
                        <Alert className="mt20" variant={"danger"}>
                          Sorry, invalid <b>username</b> or <b>password</b>.{'\n'}
                        </Alert>
                      }
                  </div>
              </Form>
              <div className="mt40" >
                  <Card.Footer className="bg-transparent text-muted">Are you a doctor? <a href="#">Request an account</a></Card.Footer>
              </div>
          </Card>
        </div>
      )
    }
}




export default LoginCard;
