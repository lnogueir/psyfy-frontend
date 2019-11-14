import React from 'react';
import '../assets/common_style.css';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { FaUserMd, FaLock } from 'react-icons/fa';
import Utils from '../assets/js/Utils'
import Button from 'react-bootstrap/Button';


class ManagePasswordCard extends React.Component{
    constructor(props){
    super(props);
    this.state = {card:"email", emailColor:"white",passwordColor:"#9d06bb49"}

    }

    

    render(){
      return (
          <div className="container" style={{width:"30rem"}}>

            <div className="row">
                

                <button className="manage-change-btn col-xs-6 col-md-6 col-lg-6" 
                onClick={()=>this.setState({card:"email",emailColor:"white",passwordColor:"#9d06bb49"}) }
                  style={{ borderRadius:"5px 5px 0px 0px", backgroundColor:this.state.emailColor }}  >  

                    <label className="change-email-lbl" > Change Email </label> 

                </button>

                <button className="manage-change-btn col-xs-6 col-md-6 col-lg-6" 
                onClick={()=>this.setState({card:"password",emailColor:"#9d06bb49",passwordColor:"white"}) } 
                 style={{borderRadius:"5px 5px 0px 0px", backgroundColor:this.state.passwordColor}} >  
                    <label className="change-email-lbl" > Change Password </label> 
                </button>

            </div>

            {this.state.card == "email"
                ?
                <Card  className="row manage-card" style={{padding:10,borderRadius: "0px 5px 5px 5px"}} >

                    <label style={{fontSize:20,fontWeight:650}}>Change Your Email</label>

                    <Form style={{padding:"0% 10% 5% 10%"}} >
                    
                        <Form.Group >
                            <div >
                                
                                <input type="text" className="manage-input" placeholder="New Email" />
                            </div>
                        </Form.Group>
                        <Form.Group >
                            <div >
                                
                                <input type="text" className="manage-input" placeholder="Old Email" />
                            </div>
                        </Form.Group>
                        <Form.Group >
                            <div >
                                <input type="text" className="manage-input" placeholder="Confirm Old Email" />
                            </div>
                        </Form.Group>
                        
                       

                    
                    </Form>
                    <button className="managebtn mt30" style={{ backgroundColor: "#c878fa",borderStyle:"none"}} 
                                variant="primary" type="submit"  >
                                Change My Email 
                    </button>

                    
                </Card>
                :
                <Card  className="row manage-card" style={{padding:10,borderRadius: "5px 0px 5px 5px"}} >

                    <label style={{fontSize:20,fontWeight:650}}>Change Your Password</label>

                    <Form style={{padding:"0% 10% 5% 10%"}} >

                        <Form.Group >
                            <div >
                                
                                <input type="text" className="manage-input" placeholder="New Password" />
                            </div>
                        </Form.Group>
                        <Form.Group >
                            <div >
                                
                                <input type="password" className="manage-input" placeholder="Old Password" />
                            </div>
                        </Form.Group>
                        <Form.Group >
                            <div >
                                <input type="password" className="manage-input" placeholder="Confirm Old Password" />
                            </div>
                        </Form.Group>
                        
                    


                    </Form>
                    <button className="managebtn mt30" style={{ backgroundColor: "#c878fa",borderStyle:"none"}} 
                                variant="primary" type="submit"  >
                                Change My Password
                    </button>

                
            </Card>
             }

            

            

            
          </div>
        )
    }
}




export default ManagePasswordCard;
