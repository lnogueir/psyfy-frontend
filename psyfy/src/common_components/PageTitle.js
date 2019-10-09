import React from 'react';


function PageTitle(props){
  return (
    <div style={{width:"100%"}} className="bg-psyfy-page-title p20">
      <h1 className="align-vertical text-bold-white">{props.page_title}</h1>
    </div>
  )
}

export default PageTitle
