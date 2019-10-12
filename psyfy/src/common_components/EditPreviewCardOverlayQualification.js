import React from 'react'
import Form from 'react-bootstrap/Form'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase, faLightbulb, faCertificate, faGraduationCap } from '@fortawesome/free-solid-svg-icons'


class EditPreviewCardOverlayQualification extends React.Component{
  constructor(){
    super()
    this.state = {
      is_editing: false
    }
  }

  render(){
    return (
      <Form>
        <div className="justify-start">
          <h3 onClick={()=> this.setState({is_editing:!this.state.is_editing})}>{`${this.state.is_editing?"*":""}Qualification Info:`}</h3>
          <Button style={{display:this.state.is_editing?"block":"none"}} className="ml20 w200" type="outline" variant="success">Update Qualification</Button>
        </div>
        <div className="row">
          <div className="col-xs-6 col-md-6 col-lg-6">
            <Form.Group controlId="formGridEducation">
              <Form.Label>
                <FontAwesomeIcon size="2x" icon={faGraduationCap}/>
                &nbsp;&nbsp;&nbsp;
                <b>Education</b>
                </Form.Label>
              <Form.Control
                name="education"
                onChange={e=>this.props.handleChangeProp('name',e.target.value)}
                type="education"
                placeholder="Enter your name" value={this.props.name}
              />
            </Form.Group>
          </div>
          <div className="col-xs-6 col-md-6 col-lg-6">
            <Form.Group controlId="formGridCertificate">
              <Form.Label>
                <FontAwesomeIcon size="2x" icon={faCertificate}/>
                &nbsp;&nbsp;&nbsp;
                <b>Certification & Licensure</b>
              </Form.Label>
              <Form.Control
                name="certification"
                onChange={e=>this.props.handleChangeProp('number',e.target.value)}
                placeholder="(123) 456 789" value={this.props.number}
              />
            </Form.Group>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-lg-6">
            <Form.Group controlId="formGridSpecialization">
              <Form.Label>
                <FontAwesomeIcon size="2x" icon={faLightbulb}/>
                &nbsp;&nbsp;&nbsp;
                <b>Specialization</b>
              </Form.Label>
              <Form.Control
                name="specialization"
                onChange={e=>this.props.handleChangeProp('contact_email',e.target.value)}
                placeholder="Your email"
                value={this.props.contact_email}
              />
            </Form.Group>
          </div>
          <div className="col-xs-12 col-lg-6">
            <Form.Group controlId="formGridYearsOfExperience">
              <Form.Label>
                <FontAwesomeIcon size="2x" icon={faBriefcase} />
                &nbsp;&nbsp;&nbsp;
                <b>Years of Experience</b>
              </Form.Label>
              <Form.Control
                name="experience"
                onChange={e=>this.props.handleChangeProp('contact_email',e.target.value)}
                placeholder="Your email"
                value={this.props.contact_email}/>
            </Form.Group>
          </div>
        </div>
      </Form>
    )
  }
}

export default EditPreviewCardOverlayQualification;
