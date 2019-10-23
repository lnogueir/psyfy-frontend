import React from 'react';
import Navbar from '../common_components/Navbar';
import LoggedNavbar from '../common_components/LoggedNavbar';
import PageTitle from '../common_components/PageTitle';
import Utils from '../assets/js/Utils'


class Header extends React.Component{
  constructor(props){
    super(props)
    this.state={
      toggleUpdate:false
    }
    Utils.listenToStorageClear(()=>this.setState(prevState=>({toggleUpdate: !prevState.toggleUpdate})))
    console.log(window.localStorage.getItem('loggedUser'))
  }

  render(){
    return (
      <div className="fixed-top">
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
        <PageTitle page_title={this.props.page_title}/>
      </div>
    )
  }
}

export default Header;
