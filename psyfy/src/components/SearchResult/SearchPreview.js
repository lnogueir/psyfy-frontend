import React from 'react';
import TherapistProfileImage from '../../OLD/therapist/TherapistProfileImage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapPin, faEnvelope, faUserMd, faAddressBook } from '@fortawesome/free-solid-svg-icons'

class SearchPreview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      is_small_screen: window.innerWidth <= 770,
    }
  }

  componentDidMount = () => {
    window.addEventListener('resize', () => {
      var window_size = window.innerWidth;
      console.log(this.state.is_small_screen)
      if ((window_size <= 770 && !this.state.is_small_screen) || (window_size > 770 && this.state.is_small_screen)) {
        console.log(window_size)
        this.setState(prevState => ({
          is_small_screen: !prevState.is_small_screen
        }))
      }
    });
  }

  render() {
    return (
      <div className="fs15 p15 search-preview-wrap">
        <div className="d-flex justify-content-center">
          <TherapistProfileImage
            image_src={this.props.image_src}
          />
          <div className="justify-between">
            <h4>Contact Info:</h4>
            <i className="float-right">3km away</i>
          </div>
          <p><FontAwesomeIcon size="2x" icon={faUserMd} />&nbsp;&nbsp;&nbsp;Name:<b className="align-vertical-6 fweight-500 float-right">{this.props.name}</b></p>
          <p><FontAwesomeIcon size="2x" icon={faAddressBook} />&nbsp;&nbsp;&nbsp;Phone:<b className="align-vertical-6 fweight-500 float-right">{this.props.number}</b></p>
          <p><FontAwesomeIcon size="2x" icon={faEnvelope} />&nbsp;&nbsp;&nbsp;Email:<b className="align-vertical-6 fweight-500 float-right">{this.props.email}</b></p>
          <p><FontAwesomeIcon size="2x" icon={faMapPin} />&nbsp;&nbsp;&nbsp;Address:<b className="align-vertical-6 fweight-500 float-right">{this.props.clinic_address}</b></p>
          <h4>Summary:</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint</p>
        </div>
      </div>
    )
  }
}

export default SearchPreview;
