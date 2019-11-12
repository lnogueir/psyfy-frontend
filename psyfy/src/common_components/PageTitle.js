import React from 'react';


function PageTitle(props){
  return (
    <div className="bg-psyfy-page-title p12 pt15">
      <h1 id="page-title">{props.page_title}</h1>
    </div>
  )
}

export default PageTitle
