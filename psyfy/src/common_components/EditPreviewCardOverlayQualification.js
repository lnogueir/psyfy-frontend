import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase, faLightbulb, faCertificate, faGraduationCap } from '@fortawesome/free-solid-svg-icons'


class EditPreviewCardOverlayQualification extends React.Component{
  constructor(){
    super()
    this.state = {
      is_updating: false
    }
  }


  componentDidMount = () => {
    this.education = this.props.education
    this.certification = this.props.certification
    this.specialization = this.props.specialization
    this.experience = this.props.experience
  }

  isUpdating = () => {
     return (this.education!==this.props.education ||
      this.certification!==this.props.certification ||
      this.specialization!==this.props.specialization ||
      this.experience!==this.props.experience)
  }


  handleUpdate = (event) => {
    event.preventDefault();
    let data = {
      degree: event.target.elements.education.value,
      specialize: event.target.elements.specialization.value,
      certification_license: event.target.elements.certification.value,
      years_of_experience: event.target.elements.experience.value,
    }
    const url = process.env.REACT_APP_LOOPBACK_IP + `/site_profiles/5/education`
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
  .catch(error => console.error('Error', error));
  }

  render(){
    return (
      <Form onSubmit={this.handleUpdate}>
        <div className="justify-start">
          <h3>{`${this.isUpdating()?"*":""}Qualification Info:`}</h3>
          <input style={{display:this.isUpdating()?"block":"none"}} type="submit" id="update-contact-button" value={"Update"} className="w150 btn btn-outline-primary elementToFadeInAndOut"/>
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
                onChange={e=>this.props.handleChangeProp('education',e.target.value)}
                placeholder="e.g Bachelor of Psycology"
                value={this.props.education}
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
                onChange={e=>this.props.handleChangeProp('certification',e.target.value)}
                placeholder="Therapist Licensure"
                value={this.props.certification}
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
                onChange={e=>this.props.handleChangeProp('specialization',e.target.value)}
                placeholder="Psycodynamics"
                value={this.props.specialization}
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
                onChange={e=>this.props.handleChangeProp('experience',e.target.value)}
                placeholder="8 years"
                value={this.props.experience}/>
            </Form.Group>
          </div>
        </div>
      </Form>
    )
  }
}

export default EditPreviewCardOverlayQualification;
