import React from 'react'
import {Link} from 'react-router-dom'

function NavbarBrand(){
  return(
    <Link to={'/'}>
      <a className="navbar-brand" href="#">
        <img style={{width:'150px'}} src={require('../assets/images/psycare_logo.png')} />
      </a>
    </Link>
  )
}

export default NavbarBrand;
