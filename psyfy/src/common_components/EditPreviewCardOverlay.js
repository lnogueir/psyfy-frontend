import React from 'react'
import EditPreviewCardOverlayContactInfo from './EditPreviewCardOverlayContactInfo';
import EditPreviewCardOverlayQualification from './EditPreviewCardOverlayQualification';

function EditPreviewCardOverlay(props){
    return(
      <div className="overlay-box-preview">
         <div className="float-right" style={{lineHeight:"30px"}}>
           <a
             href="#"
             style={{fontSize:30, color:"#575757"}}
             className="closebtn"
             onClick={e => {
               e.preventDefault()
               props.toggleDisplay()
             }}
           >
             &times;
           </a>
         </div>
         <div className="row align-text-left">
           <div className="col-xs-12 col-md-12 col-lg-12">
             <EditPreviewCardOverlayContactInfo
               fields={props.fields.contact_info}
               onFieldUpdate={props.onFieldUpdate.contact_info}
             />
           </div>
           <div className="col-xs-12 col-md-12 col-lg-12">
             <hr />
           </div>
           <div className="col-xs-12 col-md-12 col-lg-12">
             <EditPreviewCardOverlayQualification
               fields={props.fields.qualification_info}
               onFieldUpdate={props.onFieldUpdate.qualification_info}
             />
           </div>
         </div>
        </div>
    )
}

export default EditPreviewCardOverlay;
