import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import EditPreviewCardOverlay from './EditPreviewCardOverlay'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapPin, faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import OverviewOverlay from './OverviewOverlay'

class OverviewPreviewCard extends React.Component{
  constructor(){
    super()
    this.should_display_edit=false
    this.state={
      is_therapist: true, // colocar isso no overview page
      name: "Lucas Nogueira" ,
      contact_email: "jawy2@uwaterloo.ca",
      number: "226 978 5884",
      clinic_address: "386 Beechdrops Dr",
    }
  }

  toggleShouldDisplay = () =>{
    this.should_display_edit=!this.should_display_edit
    if(!this.should_display_edit){
      this.props.handlePageTitleUpdate('Therapist Overview')
    }else{
      this.props.handlePageTitleUpdate('Edit Profile Preview')
    }
  }

  handleChangeState = (key,value) => {
    this.setState({
      [key]: value
    })
  }

  render(){
    return (
      <React.Fragment>
        <OverviewOverlay
          toggleShouldDisplay={this.toggleShouldDisplay}
          should_display={this.should_display_edit}
        >
          <EditPreviewCardOverlay
              name={this.state.name}
              number={this.state.number}
              address={this.state.clinic_address}
              contact_email={this.state.contact_email}
              handleChangeProp={this.handleChangeState}
           />
        </OverviewOverlay>
        <Card id="overview-preview-card">
          <Card.Header as="h4">
            Lucas Nogueira
            {
              this.state.is_therapist?
              <FontAwesomeIcon
                className="float-right pointer fs20"
                icon={faPencilAlt}
                onClick={this.toggleShouldDisplay}
              />
              :null
            }
          </Card.Header>
          <Card.Body>
              <Card.Text style={{lineHeight:"25px"}}>
                <span className="fweight-700">Bachelor Psycology | Verified</span>
                <br/>
                <i>Psychodynamics</i>
                <br/><br/>
                <FontAwesomeIcon
                  style={{fontSize:"20px"}}
                  icon={faMapPin}
                />
                &nbsp;&nbsp;386 Beechdrops Dr, Waterloo
                <i className="float-right align-vertical-2">3km away</i>
              </Card.Text>
              <div className="mt20 justify-around">
                <Button
                  className="m5 w150 fweight-700 radius-button"
                  variant="secondary"
                >
                Contact
                </Button>
                <Button
                  style={{backgroundColor:"#8c5ccc", borderColor:"#8c5ccc"}}
                  className="m5 w150 fweight-700 radius-button"
                  variant="secondary"
                >
                  Appointment
                </Button>
              </div>
          </Card.Body>
        </Card>
      </React.Fragment>
    )
  }
}

export default OverviewPreviewCard;
