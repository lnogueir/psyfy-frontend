import React from 'react'
import Form from 'react-bootstrap/Form';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapPin, faEnvelope, faUserMd, faAddressBook } from '@fortawesome/free-solid-svg-icons'
import AutocompleteInput from './AutocompleteInput'
import { geocodeByAddress , getLatLng } from 'react-places-autocomplete';


class EditPreviewCardOverlayContactInfo extends React.Component{
  constructor(){
    super()
    this.show_tooltip=false;
    this.state = {
      is_updating: false
    }
  }


  componentDidMount = () => {
    this.name = this.props.name
    this.email = this.props.email
    this.number = this.props.number
    this.address = this.props.address

  }


  handleUpdate = (event) => {
    event.preventDefault();
    const address = event.target.elements.clinicAdress.value;
    let data = {
      full_name: event.target.elements.fullName.value,
      address: address,
      phone_number: event.target.elements.phoneNumber.value,
      contact_email: event.target.elements.contact_email.value,
    }
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        const url = process.env.REACT_APP_LOOPBACK_IP + `/site_profiles/5/contactInformation`
        data.location = latLng
        fetch(url, {
          method:'PUT',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': "GKLJulXBCcxvwfRTDzb5dB7X6KCBgVh1B1BeCX0BqiUNzJFViAch74K28kggGsk9"
          }
        })
        .then(response=>response.json())
        .then(responseJson=>console.log(responseJson))
      })
      .catch(error => console.error('Error', error));

  }


  handleEmailTooltip = () => {
    if(this.show_tooltip){
        this.refs.email_tooltip.hide()
    }else{
        this.refs.email_tooltip.show()
    }
    this.show_tooltip = !this.show_tooltip
  }


  render(){
    return (
      <Form onSubmit={this.handleUpdate}>
        <h3>{"Contact Info:"}</h3>
        <div className="row">
          <div className="col-xs-6 col-md-6 col-lg-6">
            <Form.Group controlId="formGridName">
              <Form.Label>
                <FontAwesomeIcon size="2x" icon={faUserMd}/>
                &nbsp;&nbsp;&nbsp;
                <b>Full Name</b>
                </Form.Label>
              <Form.Control
                name="fullName"
                onChange={e=>this.props.handleChangeProp('name',e.target.value)}
                type="therapistName"
                placeholder="Enter your name" value={this.props.name}
              />
            </Form.Group>
          </div>
          <div className="col-xs-6 col-md-6 col-lg-6">
            <Form.Group controlId="formGridNumber">
              <Form.Label>
                <FontAwesomeIcon size="2x" icon={faAddressBook}/>
                &nbsp;&nbsp;&nbsp;
                <b>Phone</b>
              </Form.Label>
              <Form.Control
                name="phoneNumber"
                onChange={e=>this.props.handleChangeProp('number',e.target.value)}
                placeholder="(123) 456 789" value={this.props.number}
              />
            </Form.Group>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-lg-6">
            <Form.Group controlId="formGridEmail">
              <Form.Label>
                  <div style={{justifyContent:"start",display:"flex"}}>
                    <FontAwesomeIcon size="2x" icon={faEnvelope} />
                    <b style={{marginLeft:"10px", marginTop:"9px"}}>Email</b>
                    <ButtonToolbar style={{marginLeft:"20px", marginTop:"10px"}}>
                      <OverlayTrigger
                      ref="email_tooltip"
                      placement={"top"}
                      trigger="manual"
                      overlay={
                        <Tooltip>
                          <strong>Note:&nbsp;</strong>
                          This is your contact email,
                          if you would like to edit your login email
                          go to <a href="#">"Manage Credentials"</a>.
                        </Tooltip>
                      }
                      >
                        <img
                          onClick={this.handleEmailTooltip}
                          className="question-mark"
                          src={require('../assets/images/blue_question_mark.png')}
                        />
                      </OverlayTrigger>
                    </ButtonToolbar>
                  </div>
                </Form.Label>
              <Form.Control name="contact_email" onChange={e=>this.props.handleChangeProp('contact_email',e.target.value)} type="email" placeholder="Your email" value={this.props.contact_email}/>
            </Form.Group>
          </div>
          <div className="col-xs-12 col-lg-6">
            <Form.Group controlId="formGridAddress1">
              <Form.Label>
                <FontAwesomeIcon size="2x" icon={faMapPin} />
                &nbsp;&nbsp;&nbsp;
                <b>Clinic Address</b>
              </Form.Label>
              <AutocompleteInput
                updateLatLng={this.updateLatLng}
                address={this.props.address}
                handleChangeProp={this.props.handleChangeProp}
              />
            </Form.Group>
          </div>
        </div>
        <input type="submit" id="update-contact-button" value={"Update"} className="w200 btn btn-outline-primary"/>
      </Form>
    )
  }
}


export default EditPreviewCardOverlayContactInfo;
