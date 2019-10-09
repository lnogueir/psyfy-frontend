import React from 'react';
import Navbar from '../common_components/Navbar';
import PageTitle from '../common_components/PageTitle';

function Header(props){
  return (
    <div className="fixed-top">
      <Navbar
        name={props.name}
        image_src={props.image_src}
      />
      <PageTitle page_title={props.page_title}/>
    </div>
  )
}

export default Header;
