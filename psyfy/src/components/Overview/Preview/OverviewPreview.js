import React from 'react'
import OverviewPreviewImage from './OverviewPreviewImage'
import OverviewPreviewCard from './OverviewPreviewCard'
import OverviewPreviewSummary from './OverviewPreviewSummary'

function OverviewPreview(props){
    return(
      <React.Fragment>
        <div className="d-flex justify-content-center">
          <OverviewPreviewImage
            onFieldUpdate={props.onFieldUpdate.image_uri}
            image_uri={props.fields.image_uri}
          />
          <OverviewPreviewCard
            onFieldUpdate={props.onFieldUpdate.card_info}
            fields={props.fields.card_info}
          />
        </div>
        <div className="d-flex justify-content-center">
          <OverviewPreviewSummary
            fields={props.fields.summary}
            onFieldUpdate={props.onFieldUpdate.summary}
          />
        </div>
      </React.Fragment>
    );

}

export default OverviewPreview;
