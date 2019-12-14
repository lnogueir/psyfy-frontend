import React from 'react'

function EditPreviewCardOverlayTitle(props) {
  return (
    <div className="justify-between">
      <h1 className="req-tab-title">{`${props.isUpdating() ? "*" : ""}${props.title}:`}</h1>
      <div style={{ display: props.isUpdating() ? "flex" : "none" }}>
        <button
          type="submit"
          className="shrink-w100-sm button-update-preview animated fadeInRight"
        >
          Save
        </button>
      </div>
    </div>
  )
}

export default EditPreviewCardOverlayTitle;
