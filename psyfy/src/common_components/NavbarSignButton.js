import React from 'react';
import Badge from 'react-bootstrap/Badge';
import LoginCard from './LoginCard';

class NavbarSignButton extends React.Component{
    constructor(){
        super();
        this.state = { loginDisplay:"none"   }
    }

    logInButtonAction = () => {
            this.setState({ loginDisplay:"block" })
        }

    render(){
        return (
            
            <div style={{ width: 190 }}>

                <div style={{ display: this.state.loginDisplay  }}>
                <LoginCard/>
                </div>
                
                <a  onClick={this.logInButtonAction} className="mt10 fweight-700 mark-on-hover" style={{color:"white",fontSize:18, float:"left"}}> Log in </a>
            <a className="text-bold-white" href="#">
                <div style={{float:"right"}}className="bg-white-on-hover border-2 border rounded p6 m5">
                    Get Started
                </div>
            </a>
            </div>
        );  
    }
}


export default NavbarSignButton;