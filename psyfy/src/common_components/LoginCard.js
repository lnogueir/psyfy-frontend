import React from 'react';
import '../assets/common_style.css';

import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card'

import SweetAlert from 'sweetalert2-react';
import { FaUserMd, FaLock } from 'react-icons/fa';



class LoginCard extends React.Component{
    constructor(){
    super();
    this.state = {
                
                name:"Andre",
                password:"andre",
                errorAlertShow: false,
                successAlertShow: false} 
    }

    handleUpdate=(event)=>{
        event.preventDefault()
        if(event.target.elements.password.value != this.state.password){
            this.setState({errorAlertShow: true })
        }else{
            this.setState({successAlertShow: true })

        }
    }


    render(){
        return(
        <Card className="login-card box-shadow">
                
                <SweetAlert show={this.state.errorAlertShow} title="Ops.."  
                text="Wrong password, plase try again." confirmButtonColor="#c878fa" 
                confirmButtonText="Go back" type='error'/>
                <SweetAlert show={this.state.successAlertShow} title="Great!"  
                text="You have successfully logged in." confirmButtonColor="#c878fa" 
                confirmButtonText="Ok" type='success'/>
            <div className="mb40 mt10"style={{fontSize: 20}}>
                Psyfy Login
            </div>    

            

            <Form onSubmit={this.handleUpdate} >
                <div style={{textAlign:"center"}}>
                    <Form.Group controlId="formBasicEmail">
                        
                        <div className="input-group mb-3">
                            <i className="login-icon" ><FaUserMd /></i>
                            <input type="text" className="form-control login-input" placeholder="     Username" />
                        </div>
                        
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    
                    <Form.Group controlId="formBasicPassword">
                        <div className="input-group mb-3">
                            <i className="login-icon" ><FaLock /></i>
                            <input type="text" className="form-control login-input" placeholder="     Password" />
                        </div>
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="I want to receive psyfy news" />
                    </Form.Group>
                </div>
                <div style={{textAlign:"center"}}>
                    <button class="logbtn" style={{backgroundColor: "#c878fa",borderStyle:"none"}} 
                    variant="primary" type="submit"  >
                        Log In 
                    </button>
                </div>

            </Form>
            <div className="mt40" >
                Not a member? <a href="https://www.google.com"> Sign up now! </a>
            </div>
            
        </Card>

        )
    }
}




export default LoginCard;