import React from 'react';
import Footer from './Footer';
import Header from './Header';


function PageTemplate(props){
    return (
      <React.Fragment>
          <Header page_title={props.page_title} />
          {props.children}
          <Footer />
      </React.Fragment>)
}

export default PageTemplate;
