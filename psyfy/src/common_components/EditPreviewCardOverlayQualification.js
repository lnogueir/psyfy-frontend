import React from 'react'
import Form from 'react-bootstrap/Form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase, faLightbulb, faCertificate, faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import EditPreviewCardOverlayTitle from './EditPreviewCardOverlayTitle'

class EditPreviewCardOverlayQualification extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      is_updating: false
    }
  }

  updateFields = () =>{
    this.education = this.props.fields.degree
    this.certification = this.props.fields.certification_license
    this.specialization = this.props.fields.specialize
    this.experience = this.props.fields.years_of_experience
  }

  componentDidMount = () => {
    this.updateFields()
  }

  isUpdating = () => {
     return (this.education!==this.props.fields.degree ||
      this.certification!==this.props.fields.certification_license ||
      this.specialization!==this.props.fields.specialize ||
      this.experience!==this.props.fields.years_of_experience)
  }


  handleUpdate = (event) => {
    event.preventDefault();
    let data = {
      degree: event.target.elements.education.value,
      specialize: event.target.elements.specialization.value,
      certification_license: event.target.elements.certification.value,
      years_of_experience: event.target.elements.experience.value,
    }
    const correct_storage = window.localStorage.getItem('loggedUser') || window.sessionStorage.getItem('loggedUser')
    const loggedUser = JSON.parse(correct_storage)
    const url = process.env.REACT_APP_LOOPBACK_IP + `/site_profiles/${loggedUser.id}/education`
    fetch(url, {
      method:'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': loggedUser.token
      }
    })
    .then(response=>{
      console.log(response)
      if( response.status===200){
        this.updateFields()
        this.forceUpdate()
      }
    })
    .catch(error => console.error('Error', error));
  }

  render(){
    return (
      <Form onSubmit={this.handleUpdate}>
        <EditPreviewCardOverlayTitle
          isUpdating={this.isUpdating}
          title={"Qualification Info"}
        />
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
                onChange={e=>this.props.onFieldUpdate('degree',e.target.value)}
                placeholder="e.g Bachelor of Psycology"
                value={this.props.fields.degree}
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
                onChange={e=>this.props.onFieldUpdate('certification_license',e.target.value)}
                placeholder="Therapist Licensure"
                value={this.props.fields.certification_license}
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
                onChange={e=>this.props.onFieldUpdate('specialize',e.target.value)}
                placeholder="Psycodynamics"
                value={this.props.fields.specialize}
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
                onChange={e=>this.props.onFieldUpdate('years_of_experience',e.target.value)}
                placeholder="8 years"
                value={this.props.fields.years_of_experience}/>
            </Form.Group>
          </div>
        </div>
      </Form>
    )
  }
}

export default EditPreviewCardOverlayQualification;
