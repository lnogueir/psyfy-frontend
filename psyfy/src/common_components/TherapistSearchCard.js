import React from 'react'
import Card from 'react-bootstrap/Card'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapPin, faEnvelope, faUserMd, faPhone } from '@fortawesome/free-solid-svg-icons'

class TherapistSearchCard extends React.Component{
  constructor(){
    super()
    this.state = {
      selected_tab: "1"
    }
  }

  handleTabSelection = eventKey => {
    this.setState({selected_tab:eventKey})
  }

  render(){
    return (
      <Card align="left" id="therapist-card-v2" className="m10">
        <img alt="Profile image" width={'100%'} height={250} src={this.state.image_src!=null?this.state.image_src:require("../assets/images/profile_fill.png")}/>
        <Card.Header>
          <Nav
            onSelect={this.handleTabSelection}
            variant="tabs"
            defaultActiveKey="1"
          >
            <Nav.Item>
              <Nav.Link eventKey="1" href="#1">Summary</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="2" href="#2">Contact Info</Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>
        <Card.Body>
          <Card.Title><FontAwesomeIcon style={{fontSize:"25px"}} icon={faUserMd}/>&nbsp;&nbsp;Lucas Nogueira, PhD</Card.Title>
          <Card.Subtitle className="mb-2 text-muted"><i>Psychodynamics</i></Card.Subtitle>
          <hr/>
          {
            this.state.selected_tab=="1"
            ?
              <Card.Text className="scrollbox">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sintLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
              </Card.Text>
            :
              <Card.Text>
                <p><FontAwesomeIcon size="2x" icon={faEnvelope} />&nbsp;&nbsp;&nbsp;Email<b className="align-vertical-6 fweight-500 float-right">{this.props.email}</b></p>
                <p><FontAwesomeIcon size="2x" icon={faPhone}/>&nbsp;&nbsp;&nbsp;Phone<b className="align-vertical-6 fweight-500 float-right">{this.props.number}</b></p>
                <p><FontAwesomeIcon size="2x" icon={faMapPin} />&nbsp;&nbsp;&nbsp;Address<b className="align-vertical-6 fweight-500 float-right">{this.props.clinic_address}</b></p>
              </Card.Text>
          }
          <div className="d-flex justify-content-between">
            <Button variant="primary">View more</Button>
            <i className="text-muted align-vertical-5">3km away</i>
          </div>
        </Card.Body>
    </Card>



    );
  }


}


export default TherapistSearchCard;
