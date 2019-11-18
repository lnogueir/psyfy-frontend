import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapPin, faEnvelope, faUserMd, faAddressBook } from '@fortawesome/free-solid-svg-icons'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';


class TherapistForm extends React.Component{
  constructor(){
    super();
    this.state = {
      is_edit: false,
      address: '',
      address_id:null
    }
  }

  componentDidMount= () => {
    this.setState({address:this.props.userInfo.clinic_address})
  }

  handleUpdate =(event)=>{
    const url = process.env.REACT_APP_LOOPBACK_IP + `/site_users/5`
    const data = {
      full_name: event.target.elements.fullName.value,
      address: event.target.elements.clinicAdress.value,
      phone_number: event.target.elements.phoneNumber.value,
      email: event.target.elements.email.value,
      receive_notification: event.target.elements.allowNoti.checked
    }
    console.log(data)
    fetch(url, {
      method:'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "woGSD2gPwRzgQ1eymUg05C9N3zxK8Qv9Cm0YOQCJRML3mAvyA1pX1mez2lG0lyIq"
      }
    })
    .then(response=>response.json())
    .then(responseJson=>console.log(responseJson))
  }

  handleChange = address => {
      this.setState({ address });
    };

  // handleSelect = address => {
  //   geocodeByAddress(address)
  //     .then(results => getLatLng(results[0]))
  //     .then(latLng => console.log('Success', latLng))
  //     .catch(error => console.error('Error', error));
  // };

  render(){
    return (
      <Form onSubmit={this.handleUpdate} className="align-responsive">
        <Form.Row>
          <Form.Group as={Col} controlId="formGridName">
            <Form.Label><FontAwesomeIcon size="2x" icon={faUserMd}/>&nbsp;&nbsp;&nbsp;Full Name</Form.Label>
            <Form.Control name="fullName" ref="nameInputNode" disabled={!this.state.is_edit} type="therapistName" placeholder="Enter your name" value={this.props.userInfo.name}/>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridNumber">
            <Form.Label><FontAwesomeIcon size="2x" icon={faAddressBook}/>&nbsp;&nbsp;&nbsp;Phone</Form.Label>
            <Form.Control name="phoneNumber" disabled={!this.state.is_edit} placeholder="(123) 456 789" value={this.props.userInfo.number}/>
          </Form.Group>
        </Form.Row>

        <Form.Group controlId="formGridEmail">
          <Form.Label><FontAwesomeIcon size="2x" icon={faEnvelope} />&nbsp;&nbsp;&nbsp;Email</Form.Label>
          <Form.Control name="email" disabled={!this.state.is_edit} type="email" placeholder="Your email" value={this.props.userInfo.email}/>
        </Form.Group>

        <Form.Group controlId="formGridAddress1">
          <Form.Label><FontAwesomeIcon size="2x" icon={faMapPin} />&nbsp;&nbsp;&nbsp;Clinic Address</Form.Label>
            <PlacesAutocomplete
              value={this.state.address}
              onChange={this.handleChange}
              onSelect={this.handleSelect}
            >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div>
                <Form.Control
                  name="clinicAdress"
                  value={this.state.address}
                  {...getInputProps({
                    disabled:!this.state.is_edit,
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
                    // inline style for demonstration purpose
                    console.log(suggestion.placeId)
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
        </Form.Group>

        <Form.Group id="formGridCheckbox">
          <Form.Check name="allowNoti" disabled={!this.state.is_edit} type="checkbox" label="Send me notifications" />
        </Form.Group>

        <div className="row justify-evenly">
          <div className="bot">
            <Button
              className="m5 w200 shrink"
              onClick={()=>{
                if(this.state.is_edit){
                  this.setState((prevState) => ({is_edit:!prevState.is_edit}))
                }
              }}
              variant={!this.state.is_edit?"secondary":"warning"}
            >
            {this.state.is_edit?"Cancel":"Change Password"}
            </Button>
          </div>
          <div className="top">
            <Button
              className="top m5 w200 shrink"
              type={this.state.is_edit ? "button" : "submit"}
              onClick={()=>{
                this.setState((prevState) => ({is_edit:!prevState.is_edit}))
                let node = ReactDOM.findDOMNode(this.refs.nameInputNode);
                if (node && node.focus instanceof Function) {
                  setTimeout(()=>node.focus(), 10)
                }
              }}
              variant="info"
            >
              {this.state.is_edit?"Update":"Edit"}
            </Button>
          </div>
        </div>
      </Form>
    )
  }

}

export default TherapistForm;
