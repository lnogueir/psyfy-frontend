import React from 'react'

function Overlay(props){
    const childrenWithProps = React.Children.map(props.children, child =>
      React.cloneElement(child, { toggleDisplay: props.toggleDisplay })
    );
    return(
      <div
        style={{height:props.should_display?"100%":"0%"}}
        onClick={props.toggleDisplay}
        className="overlay"
      >
          {childrenWithProps}  
      </div>
  )
}

export default Overlay;
