import React from 'react';
import Navbar from './Navbar/Navbar';
import LoggedNavbar from './Navbar/LoggedNavbar';
import Utils from '../../assets/js/Utils'
import { onScroll } from '../../assets/js/navbar'


class Header extends React.Component {

  componentDidMount = () => {
    onScroll()
  }

  render() {
    return (
      <div style={{ zIndex: 900 }} className="fixed-top">
        {
          window.localStorage.getItem('loggedUser') === null
            &&
            window.sessionStorage.getItem('loggedUser') === null
            ?
            <Navbar />
            :
            <LoggedNavbar
              name={this.props.name}
              image_src={this.props.image_src}
            />
        }
      </div>
    )
  }
}

export default Header;
