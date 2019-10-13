import React from 'react'
import OverviewPreviewImage from './OverviewPreviewImage'
import OverviewPreviewCard from './OverviewPreviewCard'
import OverviewPreviewSummary from './OverviewPreviewSummary'

function OverviewPreview(props){
    return(
      <div className="m15">
        <div className="d-flex justify-content-center">
          <OverviewPreviewImage
            handleImageSrc={props.handleImageSrc}
            image_src={props.image_src}
          />
          <OverviewPreviewCard
            is_therapist={props.is_therapist}
            handlePageTitleUpdate={props.handlePageTitleUpdate}
          />
        </div>
        <div className="d-flex justify-content-center">
          <OverviewPreviewSummary
            is_therapist={props.is_therapist}
          />
        </div>
      </div>
    );

}

export default OverviewPreview;
