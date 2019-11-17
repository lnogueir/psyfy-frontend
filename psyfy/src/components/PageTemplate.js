import React from 'react';
import Footer from './Footer';
import Header from './Header/Header';


function PageTemplate(props) {
  return (
    <React.Fragment>
      <Header />
      <div className="mt50">
        {props.children}
      </div>
      <Footer />
    </React.Fragment>)
}

export default PageTemplate;
