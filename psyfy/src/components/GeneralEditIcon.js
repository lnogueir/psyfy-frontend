import React from 'react'
import EditIcon from '@material-ui/icons/Edit';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import Fab from '@material-ui/core/Fab';

function GeneralEditIcon(props) {
  return (
    <Fab
      className="float-right"
      style={{ outline: 'none' }}
      size="small"
      onClick={props.onClick}
      color={props.is_edit ? 'secondary' : "default"}
      aria-label="edit"
    >
      {props.is_edit ? <SaveAltIcon /> : <EditIcon />}
    </Fab>
  )
}

export default GeneralEditIcon;
