import React from 'react'

function CloseOverlay(props) {
    return (
        <div className="float-right" style={{ lineHeight: "30px" }}>
            <a
                href="#"
                className="closebtn"
                onClick={e => {
                    e.preventDefault()
                    props.onClick()
                }}
            >
                &times;
            </a>
        </div>
    )
}

export default CloseOverlay;