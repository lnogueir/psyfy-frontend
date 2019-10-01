import React from 'react';

function Footer(){
  return (
  <footer className="bg-psyfy-footer page-footer font-small pt-4">

    <div className="container-fluid text-center">

      <div className="row">

        <div className="col-sm-6 col-md-6 col-lg-6 col-sm-6">

          <h5 className="text-uppercase">Footer Content</h5>
          <p>Here you can use rows and columns to organize your footer content.</p>

        </div>        

        <div className="col-sm-6 col-md-6 col-lg-6">

          <h5 className="text-uppercase">Links</h5>

          <ul className="list-unstyled">
            <li>
              <a href="#!">Link 1</a>
            </li>
            <li>
              <a href="#!">Link 2</a>
            </li>
            <li>
              <a href="#!">Link 3</a>
            </li>
            <li>
              <a href="#!">Link 4</a>
            </li>
          </ul>

        </div>

      </div>

    </div>
    <hr/>
    <div className="footer-copyright text-center py-3">© 2019 Copyright:
      <a href="https://mdbootstrap.com/education/bootstrap/"> Psyfy.com</a>
    </div>

  </footer>
  )
}

export default Footer;
