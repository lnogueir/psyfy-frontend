import React from 'react'
function EditPreviewCardOverlayTitle(props){
  return (
    <div className="justify-between">
      <h3>{`${props.isUpdating()?"*":""}${props.title}:`}</h3>
      <input
        style={{display:props.isUpdating()?"block":"none"}}
        type="submit"
        value={"Save"}
        className="shrink-w100-sm button-update-preview fade-in"
      />
    </div>
  )
}

export default EditPreviewCardOverlayTitle;
