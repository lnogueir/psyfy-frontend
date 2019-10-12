import React from 'react'
import Form from 'react-bootstrap/Form';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapPin, faEnvelope, faUserMd, faAddressBook } from '@fortawesome/free-solid-svg-icons'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';


class EditPreviewCardOverlayContactInfo extends React.Component{
  constructor(){
    super()
    this.show_tooltip=false
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
      <Form>
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
              <Form.Control name="email" onChange={e=>this.props.handleChangeProp('contact_email',e.target.value)} type="email" placeholder="Your email" value={this.props.contact_email}/>
            </Form.Group>
          </div>
          <div className="col-xs-12 col-lg-6">
            <Form.Group controlId="formGridAddress1">
              <Form.Label>
                <FontAwesomeIcon size="2x" icon={faMapPin} />
                &nbsp;&nbsp;&nbsp;
                <b>Clinic Address</b>
              </Form.Label>
                {
                <PlacesAutocomplete
                  value={this.props.address}
                  onSelect={this.handleSelect}
                  onChange={input=>this.props.handleChangeProp('clinic_address',input)}
                >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                  <div>
                    <Form.Control
                      name="clinicAdress"
                      value={this.props.address}
                      {...getInputProps({
                        placeholder:"1234 Main St",
                        className: 'location-search-input',
                      })}
                    />
                    <div className={`autocomplete-dropdown-container${suggestions.length===0?" hidden":""}`}>
                      {loading && <div>Loading...</div>}
                      {suggestions.map(suggestion => {
                        const className = suggestion.active
                          ? 'suggestion-item--active'
                          : 'suggestion-item';
                        const style = suggestion.active
                          ? { backgroundColor: '#cde9f7', cursor: 'pointer', padding:10 }
                          : { backgroundColor: '#ffffff', cursor: 'pointer' };
                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, {
                              className,
                              style,
                            })}
                          >
                            <div
                              onClick={()=>{
                                this.setState({address:suggestion.description, address_id: suggestion.placeId})
                              }}
                              >
                              <span>{suggestion.description}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </PlacesAutocomplete>
            }
            </Form.Group>
          </div>
        </div>
        <div className="justify-between">
          <Button id="update-contact-button" className="w200" variant="info">Update Contact</Button>
          <Form.Group id="formGridCheckbox">
            <Form.Check name="allowPatientToViewContact" type="checkbox" label="Allow patient to view my contact information" />
          </Form.Group>
        </div>
      </Form>
    )
  }
}


export default EditPreviewCardOverlayContactInfo;
