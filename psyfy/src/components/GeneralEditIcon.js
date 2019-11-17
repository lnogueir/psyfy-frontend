import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faSave } from '@fortawesome/free-solid-svg-icons'

function GeneralEditIcon(props){
  return (
    <FontAwesomeIcon
      className="float-right pointer fs20 general-edit-icon"
      icon={props.is_edit ? faSave : faPencilAlt}
      onClick={props.onClick}
    />
  )
}

export default GeneralEditIcon;
