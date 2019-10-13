import React from 'react'
import EditPreviewCardOverlayContactInfo from './EditPreviewCardOverlayContactInfo';
import EditPreviewCardOverlayQualification from './EditPreviewCardOverlayQualification';

function EditPreviewCardOverlay(props){
    return(
      <div className="overlay-box">
         <div className="float-right" style={{lineHeight:"30px"}}>
           <a
             href="#"
             style={{fontSize:30, color:"#575757"}}
             className="closebtn"
             onClick={e => {
               e.preventDefault()
               props.toggleShouldDisplay()
             }}
           >
             &times;
           </a>
         </div>
         <div className="row align-text-left">
           <div className="col-xs-12 col-md-12 col-lg-12">
             <EditPreviewCardOverlayContactInfo
               name={props.name}
               number={props.number}
               address={props.address}
               contact_email={props.contact_email}
               handleChangeProp={props.handleChangeProp}
             />
           </div>
           <div className="col-xs-12 col-md-12 col-lg-12">
             <hr />
           </div>
           <div className="col-xs-12 col-md-12 col-lg-12">
             <EditPreviewCardOverlayQualification
               education={props.education}
               specialization={props.specialization}
               certification={props.certification}
               experience={props.experience}
               handleChangeProp={props.handleChangeProp}
             />
           </div>
         </div>
       </div>
    )
}

export default EditPreviewCardOverlay;
