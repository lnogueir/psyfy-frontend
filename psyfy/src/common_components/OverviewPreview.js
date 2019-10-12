import React from 'react'
import CardGroup from 'react-bootstrap/CardGroup'
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
          <OverviewPreviewCard handlePageTitleUpdate={props.handlePageTitleUpdate}/>
        </div>
        <div className="d-flex justify-content-center">
          <OverviewPreviewSummary />
        </div>
      </div>
    );

}

export default OverviewPreview;
