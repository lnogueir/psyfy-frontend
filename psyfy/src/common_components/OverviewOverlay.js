import React from 'react'


function OverviewOverlay(props){
    const childrenWithProps = React.Children.map(props.children, child =>
      React.cloneElement(child, { toggleShouldDisplay: props.toggleShouldDisplay })
    );
    return(
      <div
        style={{height:props.should_display?"100%":"0%"}}
        onClick={props.toggleShouldDisplay}
        className="overlay"
      >
        <div onClick={(e)=>e.stopPropagation()} className="overlay-content">
            {childrenWithProps}
         </div>
      </div>
  )
}

export default OverviewOverlay;
