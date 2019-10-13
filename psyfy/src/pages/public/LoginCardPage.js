import React from 'react';
import '../../assets/common_style.css';
import Footer from '../../common_components/Footer';
import Header from '../../common_components/Header';
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapPin,faUserAlt, faEnvelope, faUserMd,faLock, faAddressBook } from '@fortawesome/free-solid-svg-icons'
import SweetAlert from 'sweetalert2-react';


import { InputGroup, InputGroupText, InputGroupAddon, Input } from 'reactstrap';
import { FaUserMd, FaLock } from 'react-icons/fa';



class LogInBox extends React.Component{
    constructor(){
    super();
    this.state = {name:"Andre",
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
<Card style={{}}className="login-card box-shadow">
            
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


class TestPage extends React.Component{
  constructor(){
    super();
    this.page_title = "Log in page "
    this.state = {
      name: "Lucas Nogueira" ,
      email: "jawy2@uwaterloo.ca",
      number: "226 978 5884",
      clinic_address: "386 Beechdrops Dr",
      image_src: null,
    }
  }
render(){
  return (
    <div>
    
        <Header name={this.state.name} image_src={this.state.image_src} 
        page_title = {this.page_title}
        />
        <div className="align-text-center" style={{backgroundColor: "#a967d3fb"}} >

            
            <div style={{padding:60}} className=" mb60 justify-evenly"> 
            
                <LogInBox/>
            
            </div>
        <Footer/>
        </div>
    </div>
  )
}

}


export default TestPage;