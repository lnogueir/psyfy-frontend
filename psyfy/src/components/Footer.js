import React from 'react';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import FacebookIcon from '@material-ui/icons/Facebook';
import HomeIcon from '@material-ui/icons/Home';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import { Link } from 'react-router-dom';
import LOGO from '../assets/images/psycare_logo.png';

function Footer() {
  return (
    <footer className="bg-psyfy-footer page-footer mt60">
      <div className="container-fluid text-center font-small footer-borders">
        <div className="row">
          <div
            className="col-sm-12 col-md-4 col-lg-4 footer-brand-wrap"
          >
            <img className="footer-brand" src={LOGO} />
          </div>
          <div className="col-sm-12 col-md-4 col-lg-4">
            <h5 className="text-bold-white">Our Mission:</h5>
            <blockquote className="footer-mission">
              At PsyCare, we strive to find the best doctor out there to provide  secure, qualified and meaningful appointments to our patients.
            </blockquote>
          </div>
          <div className="col-sm-12 col-md-4 col-lg-4 footer-links-responsive">
            <h5 className="text-bold-white">Links:</h5>
            <div className="links-footer">
              <Link to={'/'}>
                <a className="link-footer-href" href="#"><i><HomeIcon /></i>&nbsp;<span className="footer-link-txt">Home</span></a>
              </Link>
              <br />
              <a className="link-footer-href" href="#!"><i><ContactSupportIcon /></i>&nbsp;<span className="footer-link-txt">Contact Us</span></a>
              <br />
              <a className="link-footer-href" href="#!"><i><LinkedInIcon /></i>&nbsp;<span className="footer-link-txt">LinkedIn</span></a>
              <br />
              <a className="link-footer-href" href="#!"><i><FacebookIcon /></i>&nbsp;<span className="footer-link-txt">Facebook</span></a>
            </div>
          </div>

        </div>
      </div>
      <div className="footer-copyright text-center py-3">© 2019 Copyright:&nbsp;
          <span className="text-bold-white">PsyCare</span>
      </div>
    </footer >
  )
}

export default Footer;
