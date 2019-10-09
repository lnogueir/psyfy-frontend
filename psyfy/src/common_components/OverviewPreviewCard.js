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
    this.state={
      is_therapist: true,
      should_display: false
    }
  }

  render(){
    return (
      <React.Fragment>
        <OverviewOverlay should_display={this.state.should_display}/>
        <Card id="overview-preview-card">
          <Card.Header as="h4">
            Lucas Nogueira
            {
              this.state.is_therapist?
              <FontAwesomeIcon
                className="float-right pointer fs20"
                icon={faPencilAlt}
                onClick={()=>this.setState(prevState=>({should_display:!prevState.should_display}))}
              />
              :null
            }
          </Card.Header>
          <Card.Body>
              <Card.Text style={{lineHeight:"18px"}}>
                <p className="fweight-700">Bachelor Psycology | Verified</p>
                <p><i>Psychodynamics</i></p>
                <p>
                  <FontAwesomeIcon
                    onClick={()=>this.setState({is_edit:true})}
                    style={{fontSize:"20px"}}
                    icon={faMapPin}
                  />
                  &nbsp;&nbsp;386 Beechdrops Dr, Waterloo
                  <i className="float-right align-vertical-2">3km away</i>
                </p>
              </Card.Text>
              <div className="mt30 justify-evenly">
                <Button
                  style={{borderRadius:20, color:"white"}}
                  className="m5 w150 fweight-700"
                  variant="secondary"
                >
                Contact
                </Button>
                <Button
                  style={{borderRadius:20, color:"white", backgroundColor:"#8c5ccc", borderColor:"#8c5ccc"}}
                  className="m5 w150 fweight-700"
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
