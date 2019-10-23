import React from 'react';
import '../assets/common_style.css';
import '../../node_modules/pretty-checkbox/dist/pretty-checkbox.css'
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera,faEstethoscope ,faFileAlt,faMedal, faThumbsUp , faThumbsDown , faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FaAddressBook ,FaUserMd,FaMedal, FaLock,FaPhone,FaEnvelope,FaMapPin,FaUserGraduate,FaVenusMars,FaGraduationCap,FaUser,FaFile } from 'react-icons/fa';



class UploadCard extends React.Component{
     constructor(props){
        super(props);
        this.state={
          selectedFile:null,
          is_edit: false,
          is_loading: false,
          preview_src: null,
          icon: this.props.icon,
          backgroundImage: null
        }
      }
    
      handleChangeImage = event => {
        const file = event.target.files[0]
        const urlCreator = window.URL || window.webkitURL;
        const imageUrl = urlCreator.createObjectURL(file);
        this.setState((prevState)=>({is_edit:!prevState.is_edit, selectedFile:file, preview_src: imageUrl}))  }
    
    componentDidMount(){
        if(this.props.backgroundImage=="document"){
            this.setState({backgroundImage:require( "../assets/images/document_fill.png" ) })
        }else if(this.props.backgroundImage=="profile"){
            this.setState({backgroundImage:require( "../assets/images/profile_fill.png" ) })
        }
    }
    
      render(){
        return (

            
          <Card className= "upload-card">
             
            <Card.Img className="upload-img" alt="Profile image" src={this.state.preview_src==null?this.props.image_src!=null?
                this.props.image_src:  this.state.backgroundImage  :this.state.preview_src}/>
            
            <div className="hover-img-request-page">
                <label className="mt40">
                    <FontAwesomeIcon className="mb30" style={{fontSize:40}} icon={this.state.icon}/>
                    <input type="file" onChange={this.handleChangeImage}/>
                </label>
            </div>
          </Card>
        );
      }
    }


class RequestAccountCard extends React.Component{
    constructor(){
    super();
    this.state = {name:"Andre",
                password:"andre",
                errorAlertShow: false,
                successAlertShow: false} 
    }

    
    render(){
        return(

        <Card className="justify-center req-card" style={{padding:26,borderRadius:20,width:1100}} >
        
            <Form onSubmit={this.handleUpdate} >
                <div className="row">
                    <div className="col-lg-12"style={{fontSize:20,fontStyle:"bold"}}>
                        <label className="mt20" style={{fontWeight: 700,fontSize: 25}}>Personal information:</label>
                    </div> 
                </div> 
                <div className="row">
                    <div className="col-xs-12 col-md-6 col-lg-4">
                        <Form.Group  controlId="formBasicEmail" >
                        <div style={{float:"left"}}>
                            <i className="mr10" style={{height:60}} ><FaUser /></i>
                            <label className="mt30" style={{fontWeight: 500,fontSize: 18,marginTop:50}}>Full Name</label>
                        </div>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control reg-input" placeholder=" First Name" />
                            </div>
                        </Form.Group>
                    </div>
                    <div className="col-xs-12 col-md-6 col-lg-4">
                        <Form.Group  controlId="formBasicPassword" >
                        <div style={{float:"left"}}>
                            <i className="mr10" style={{height:60}} ><FaEnvelope /></i>
                            <label className="mt30" style={{fontWeight: 500,fontSize: 18,marginTop:50}}>Email Address</label>
                        </div>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control reg-input" placeholder=" Email" />
                            </div>
                        </Form.Group>
                    </div>
                    
                    <div className="col-xs-12 col-md-6 col-lg-4">
                        <Form.Group controlId="formBasicPassword" >
                        <div style={{float:"left"}}>
                            <i className="mr10" style={{height:60}} ><FaAddressBook /></i>
                            <label className="mt30" style={{fontWeight: 500,fontSize: 18,marginTop:50}}>Phone Number (Optional) </label>
                        </div>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control reg-input" placeholder=" Phone Number (Optional)" />
                        </div>
                        </Form.Group>
                    </div>
                    <div className="col-xs-12 col-md-6 col-lg-4">
                        <Form.Group className="register-input "  controlId="formBasicEmail" >
                        <div style={{float:"left"}}>
                            <i className="mr10" style={{height:60}} ><FaPhone /></i>
                            <label className="mt30" style={{fontWeight: 500,fontSize: 18,marginTop:50}}>Clinic Phone Number</label>
                        </div>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control reg-input" placeholder=" Clinic Phone Number" />
                            </div>
                        </Form.Group>
                    </div>
                    <div className="col-xs-12 col-md-6 col-lg-4">
                        <Form.Group className="register-input " controlId="formBasicPassword" >
                        <div style={{float:"left"}}>
                            <i className="mr10" style={{height:60}} ><FaMapPin /></i>
                            <label className="mt30" style={{fontWeight: 500,fontSize: 18,marginTop:50}}>Clinic Address</label>
                        </div>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control reg-input" placeholder=" Clinic Address" />
                            </div>
                        </Form.Group>
                    </div>
                    <div className="col-xs-12 col-md-6 col-lg-4">
                        <Form.Group className="register-input" controlId="formBasicPassword" >
                        <div style={{float:"left"}}>
                            <i className="mr10" style={{height:60}} ><FaUserGraduate/></i>
                            <label className="mt30" style={{fontWeight: 500,fontSize: 18,marginTop:50}}>Education</label>
                        </div>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control reg-input" placeholder=" Education" />
                            </div>
                        </Form.Group>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12 col-md-6 col-lg-4">
                        <Form.Group className="register-input " controlId="formBasicPassword">
                        <div style={{float:"left"}}>
                            <i className="mr10" style={{height:60}} ><FaUserMd /></i>
                            <label className="mt30" style={{fontWeight: 500,fontSize: 18,marginTop:50}}>Years of Practice</label>
                        </div>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control reg-input" placeholder=" Years of Practice" />
                            </div>
                        </Form.Group>
                    </div>
                    <div className="col-xs-12 col-md-6 col-lg-4">
                        <Form.Group className="register-input " controlId="formBasicPassword" >
                        <div style={{float:"left"}}>
                            <i className="mr10" style={{height:60}} ><FaMedal /></i>
                            <label className="mt30" style={{fontWeight: 500,fontSize: 18,marginTop:50}}>Degree</label>
                        </div>
                            <div className="input-group mb-3">
                                <input type="password" className="form-control reg-input" placeholder="Degree " />
                            </div>
                        </Form.Group>
                    </div>
                    <div className="col-xs-12 col-md-6 col-lg-4">
                        <Form.Group className="register-input " controlId="formBasicPassword" >
                        <div style={{float:"left"}}>
                            <i className="mr10" style={{height:60}} ><FaMedal /></i>
                            <label className="mt30" style={{fontWeight: 500,fontSize: 18,marginTop:50}}>Something here</label>
                        </div>
                            <div className="input-group mb-3">
                                <input type="password" className="form-control reg-input" placeholder="Something here " />
                            </div>
                        </Form.Group>
                    </div>
                </div>
                <div className="row mt30 mb30">
                   
                <label className="mt20" style={{fontWeight: 600,fontSize: 20}}> What services do you offer your patients? </label>
                    <div className=" check ">
                        <div class="reg-check-box pretty p-icon p-round p-pulse" >
                            <input type="checkbox"  />
                            <div class="state p-success">
                                <i class="icon mdi mdi-check"></i>
                                <label>Service 1</label>
                            </div>
                        </div>
                        <div class="reg-check-box pretty p-icon p-round p-pulse">
                            <input type="checkbox" style={{backgroundColor:"red"}} />
                            <div class="state p-success">
                                <i class="icon mdi mdi-check"></i>
                                <label>Sevice 2</label>
                            </div>
                        </div>
                        <div class=" reg-check-box pretty p-icon p-round p-pulse">
                            <input type="checkbox" />
                            <div class="state p-success">
                                <i class="icon mdi mdi-check"></i>
                                <label>Service 3</label>
                            </div>
                        </div>
                        <div class="reg-check-box pretty p-icon p-round p-pulse">
                            <input type="checkbox" />
                            <div class="state p-success">
                                <i class="icon mdi mdi-check"></i>
                                <label>Service 4</label>
                            </div>
                        </div>
                        <div class=" reg-check-box pretty p-icon p-round p-pulse">
                            <input type="checkbox"/>
                            <div class="state p-success">
                                <i class="icon mdi mdi-check"></i>
                                <label>Service 5</label>
                            </div>
                        </div>
                        <div class=" reg-check-box pretty p-icon p-round p-pulse">
                            <input type="checkbox" />
                            <div class="state p-success">
                                <i class="icon mdi mdi-check"></i>
                                <label>Service 6</label>
                            </div>
                        </div>
                    </div>
                    

                </div>

                <label className="mt20" style={{fontWeight: 600,fontSize: 25}}>Documentation:</label>
                <div className="row mt30">
                    <div className="col-xs-12 col-md-4 col-lg-4 mt10" >
                        <Form.Group  controlId="formBasicPassword" style={{width:300,height:50,marginLeft:"20%"}}>
                            <div className="input-group mb-3">
                                <UploadCard icon={faFileAlt} backgroundImage={"document"} />
                                <lable className="mt15 ml20">Upload Document</lable>
                            </div>
                        </Form.Group>
                    </div>
                    <div className="col-xs-12 col-md-4 col-lg-4"></div>
                    <div className="col-xs-12 col-md-4 col-lg-4 mt10" >
                        <Form.Group   controlId="formBasicPassword" style={{width:300,height:50,marginLeft:"20%"}}>
                            <div className="input-group mb-3">
                                <UploadCard icon={faCamera} backgroundImage={"profile"}  />
                                <lable className="mt15 ml20">Upload Image</lable>
                            </div>
                        </Form.Group>
                    </div>
                </div>
                
                <input className="mt40"type="checkbox" class="form-check-input" id="exampleCheck1"></input>
                    I want to receive psyfy news
                
                <div className="row mt5">
                    <div className="col-xs-12 col-md-12 col-lg-12">
                        <Form.Group controlId="formBasicPassword" >
                            <div style={{textAlign:"center"}} >
                                <button className="regbtn mt30" style={{ backgroundColor: "#c878fa",borderStyle:"none"}} 
                                variant="primary" type="submit"  >
                                Request Account 
                                </button>
                            </div>
                        </Form.Group>
                    </div>
                </div>
            </Form>
        </Card>

        )
    }
}


export default RequestAccountCard;