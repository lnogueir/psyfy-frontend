import React from 'react'
import OverviewPreviewImage from './OverviewPreviewImage'
import OverviewPreviewCard from './OverviewPreviewCard'
import OverviewPreviewSummary from './OverviewPreviewSummary'

function OverviewPreview(props){
    return(
      <div className="m15">
        <div className="d-flex justify-content-center">
          <OverviewPreviewImage
            onFieldUpdate={props.onFieldUpdate.image_uri}
            image_uri={props.fields.image_uri}
          />
          <OverviewPreviewCard
            handlePageTitleUpdate={props.handlePageTitleUpdate}
            onFieldUpdate={props.onFieldUpdate.card_info}
            updatePageTitle={props.updatePageTitle}
            fields={props.fields.card_info}
          />
        </div>
        <div className="d-flex justify-content-center">
          <OverviewPreviewSummary
            fields={props.fields.summary}
            onFieldUpdate={props.onFieldUpdate.summary}
          />
        </div>
      </div>
    );

}

export default OverviewPreview;
