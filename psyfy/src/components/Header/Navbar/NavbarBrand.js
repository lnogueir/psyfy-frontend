import React from 'react'
import { Link } from 'react-router-dom'
import LOGO from '../../../assets/images/psycare_logo.png'

function NavbarBrand() {
  return (
    <Link to={'/'}>
      <a className="navbar-brand" href="#">
        <img style={{ width: '150px' }} src={LOGO} />
      </a>
    </Link>
  )
}

export default NavbarBrand;
