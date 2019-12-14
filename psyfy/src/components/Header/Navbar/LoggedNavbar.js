import React from 'react'
import NavbarUserButton from './NavbarUserButton'
import Utils from '../../../assets/js/Utils';
import NavbarBrand from './NavbarBrand';

class LoggedNavbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: null,
      image_uri: null,
    }
    Utils.listenToStorageSet(this.handleProfileUpdate)
  }

  componentDidMount = () => {
    const correct_storage = window.localStorage.getItem('loggedUser') || window.sessionStorage.getItem('loggedUser')
    const loggedUser = JSON.parse(correct_storage)
    this.setState({
      name: loggedUser.name,
      image_uri: loggedUser.image_uri
    })
  }


  handleProfileUpdate = e => {
    var updated_info = e.detail.value
    if (this.state.image_uri != updated_info.image_uri) { this.setState({ image_uri: updated_info.image_uri }) }
    if (this.state.name != updated_info.name) { this.setState({ name: updated_info.name }) }
  }


  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-light bg-psyfy-navbar">
        <NavbarBrand />
        <div className="collapse navbar-collapse" id="navbarSupportedContent"></div>
        <div>
          <NavbarUserButton name={this.state.name} image_uri={this.state.image_uri} />
        </div>
      </nav>
    )
  }
}

export default LoggedNavbar;
