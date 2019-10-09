import React from 'react'
import CardGroup from 'react-bootstrap/CardGroup'
import OverviewPreviewImage from './OverviewPreviewImage'
import OverviewPreviewCard from './OverviewPreviewCard'
import OverviewPreviewSummary from './OverviewPreviewSummary'

class OverviewPreview extends React.Component{
  constructor(){
    super();
  }

  render(){
    return(
      <div className="m15 border">
        <div className="d-flex justify-content-center">
          <OverviewPreviewImage />
          <OverviewPreviewCard />
        </div>
        <div className="d-flex justify-content-center">
          <OverviewPreviewSummary />
        </div>
      </div>
    );
  }

}

export default OverviewPreview;
