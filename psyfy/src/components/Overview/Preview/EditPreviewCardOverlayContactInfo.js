import React from 'react'
import Form from 'react-bootstrap/Form';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapPin, faEnvelope, faUserMd, faAddressBook } from '@fortawesome/free-solid-svg-icons'
import AutocompleteInput from '../../AutocompleteInput'
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import EditPreviewCardOverlayTitle from './EditPreviewCardOverlayTitle'
import Utils from '../../../assets/js/Utils'
import { Link } from 'react-router-dom'
import NumberFormat from 'react-number-format'

class EditPreviewCardOverlayContactInfo extends React.Component {
  constructor(props) {
    super(props)
    this.show_tooltip = false;
  }

  updateFields = () => {
    this.name = this.props.fields.full_name
    this.contact_email = this.props.fields.contact_email
    this.number = this.props.fields.phone_number
    this.address = this.props.fields.address
  }

  componentDidMount = () => {
    this.updateFields()
  }

  isUpdating = () => {
    return (
      this.name !== this.props.fields.full_name ||
      this.contact_email !== this.props.fields.contact_email ||
      this.number !== this.props.fields.phone_number ||
      this.address !== this.props.fields.address
    )
  }

  componentDidMount = () => {
    this.updateFields()
  }

  handleUpdate = (event) => {
    event.preventDefault();
    const address = event.target.elements.clinicAdress.value;
    const name = event.target.elements.fullName.value
    const data = {
      full_name: name,
      address: address,
      phone_number: event.target.elements.phoneNumber.value,
      contact_email: event.target.elements.contact_email.value,
    }
    const correct_storage = window.localStorage.getItem('loggedUser') || window.sessionStorage.getItem('loggedUser')
    const loggedUser = JSON.parse(correct_storage)
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        data.location = latLng
        const endpoint = `/site_profiles/${loggedUser.id}/contactInformation`
        const authToken = loggedUser.token
        var req = new Utils.Request()
        req.setAuthorization(authToken)
        req.PUT(endpoint, JSON.stringify(data))
          .then(response => {
            if (response.status === 200) {
              this.updateFields()
              loggedUser.name = name
              window.localStorage.setItem('loggedUser', loggedUser)
              this.forceUpdate()
            }
          }).catch(err => alert(Utils.ERROR_MESSAGE + err));
      })
      .catch(err => alert(Utils.ERROR_MESSAGE + err));


  }


  handleEmailTooltip = () => {
    if (this.show_tooltip) {
      this.refs.email_tooltip.hide()
    } else {
      this.refs.email_tooltip.show()
    }
    this.show_tooltip = !this.show_tooltip
  }


  render() {
    return (
      <Form onSubmit={this.handleUpdate}>
        <EditPreviewCardOverlayTitle
          isUpdating={this.isUpdating}
          title={"Contact Info"}
        />
        <div className="row">
          <div className="col-xs-6 col-md-6 col-lg-6">
            <Form.Group controlId="formGridName">
              <Form.Label>
                <FontAwesomeIcon size="2x" icon={faUserMd} />
                &nbsp;&nbsp;&nbsp;
                <b>Full Name</b>
              </Form.Label>
              <Form.Control
                name="fullName"
                onChange={e => this.props.onFieldUpdate('full_name', e.target.value)}
                type="therapistName"
                placeholder="Enter your name"
                value={this.props.fields.full_name}
              />
            </Form.Group>
          </div>
          <div className="col-xs-6 col-md-6 col-lg-6">
            <Form.Group controlId="formGridNumber">
              <Form.Label>
                <FontAwesomeIcon size="2x" icon={faAddressBook} />
                &nbsp;&nbsp;&nbsp;
                <b>Phone</b>
              </Form.Label>
              <NumberFormat
                onChange={e => this.props.onFieldUpdate('phone_number', e.target.value)}
                placeholder="123-456-7890"
                value={this.props.fields.phone_number}
                format="###-###-####"
                className="form-control"
                name="phoneNumber"
              />
            </Form.Group>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-lg-6">
            <Form.Group controlId="formGridEmail">
              <Form.Label>
                <div style={{ justifyContent: "start", display: "flex" }}>
                  <FontAwesomeIcon size="2x" icon={faEnvelope} />
                  <b style={{ marginLeft: "10px", marginTop: "9px" }}>Email</b>
                  <ButtonToolbar style={{ marginLeft: "20px", marginTop: "10px" }}>
                    <OverlayTrigger
                      ref="email_tooltip"
                      placement={"top"}
                      trigger="manual"
                      overlay={
                        <Tooltip style={{ zIndex: 10001 }}>
                          <strong>Note:&nbsp;</strong>
                          This is your contact email,
                          if you would like to edit your login email
                          go to <Link to={'/manage_credentials'}><a href="#">"Manage Credentials"</a></Link>.
                        </Tooltip>
                      }
                    >
                      <img
                        onClick={this.handleEmailTooltip}
                        className="question-mark"
                        src={require('../../../assets/images/blue_question_mark.png')}
                      />
                    </OverlayTrigger>
                  </ButtonToolbar>
                </div>
              </Form.Label>
              <Form.Control
                name="contact_email"
                onChange={e => {
                  this.props.onFieldUpdate('contact_email', e.target.value)
                }}
                placeholder="Your email"
                value={this.props.fields.contact_email} />
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
                address={this.props.fields.address}
                className={'form-control'}
                name={"clinicAdress"}
                onFieldUpdate={this.props.onFieldUpdate}
              />
            </Form.Group>
          </div>
        </div>
      </Form>
    )
  }
}

export default EditPreviewCardOverlayContactInfo;
