import React from 'react'


function OverviewOverlay(props){
    console.log(props)
    return(
      <div style={{height:props.should_display?"100%":"0"}} className="overlay">
        <div className="overlay-content">
            <button>Caralho em </button>
        </div>
      </div>
  )
}

export default OverviewOverlay;
