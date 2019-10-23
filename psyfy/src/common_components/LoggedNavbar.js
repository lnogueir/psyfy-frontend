import React from 'react';
import NavbarUserButton from './NavbarUserButton';
import NavbarSignButton from './NavbarSignButton'
import Utils from '../assets/js/Utils';
import { Link } from 'react-router-dom';


class LoggedNavbar extends React.Component{
    constructor(props){
      super(props)
      this.state = {
          name:null,
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
      if(this.state.image_uri != updated_info.image_uri){this.setState({image_uri:updated_info.image_uri})}
      if(this.state.name != updated_info.name){this.setState({name:updated_info.name})}
    }

// PARA RESOLVER O ERRO DA NAV BAR NAO EXPANDIR, REMOVER O FIXED HEIGHT DO NAVBAR

    render(){
      return (
        <nav className="navbar navbar-expand-md navbar-light bg-psyfy-navbar">
          <Link to={'/'}>
            <a className="navbar-brand" href="#">Psyfy</a>
          </Link>
          <div id="hide-left-for-40">
            <NavbarUserButton name={this.state.name} image_uri={this.state.image_uri}/>
          </div>
          <button id="toggle-button" className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item">
                <Link to='/calendar'>
                  <a href="#" className="nav-link">
                    My Calendar
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Disabled</a>
              </li>
            </ul>
          </div>
          <div id="display-right-for-40">
              <NavbarUserButton name={this.state.name} image_uri={this.state.image_uri}/>
          </div>
        </nav>
      )
   }
}

export default LoggedNavbar;
