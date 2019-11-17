import React from 'react'
import { putColor, makeTransparent } from '../assets/js/navbar.js'


function Overlay(props){
    if(props.should_display){putColor()}
    var new_toggle = () => {
      props.toggleDisplay()
      if(!props.should_display){putColor()}
      else{makeTransparent()}
    }
    const childrenWithProps = React.Children.map(props.children, child =>
      React.cloneElement(child, { toggleDisplay: new_toggle })
    );
    return(
      <div
        style={{height:props.should_display?"100%":"0%"}}
        onClick={new_toggle}
        className="overlay"
      >
        <div onClick={(e)=>e.stopPropagation()} className={props.className}>
          {childrenWithProps}
        </div>
      </div>
  )
}

export default Overlay;
