import React from 'react';
import EditPreviewCardOverlayContactInfo from './EditPreviewCardOverlayContactInfo';
import EditPreviewCardOverlayQualification from './EditPreviewCardOverlayQualification';
import CloseOverlay from '../../CloseOverlay';

function EditPreviewCardOverlay(props) {
  return (
    <div className="overlay-box-preview">
      <CloseOverlay onClick={props.toggleDisplay} />
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
