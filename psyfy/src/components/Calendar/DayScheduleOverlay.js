import React from 'react'
import Utils from '../../assets/js/Utils'
import SchedulePlanBody from './SchedulePlanBody'

function DayScheduleOverlay(props) {
  return (
    <div className="overlay-box-schedule">
      {props.day &&
        <div align="left" className="schedule-overlay-header">
          <h2><b>{Utils.MONTHS[props.day.day.getMonth()] + ' ' + props.day.day.getDate()}</b>, {props.day.day.getFullYear()}</h2>
          <h3>{Utils.WEEK[props.day.day.getDay()]}</h3>
        </div>
      }
      <SchedulePlanBody
        day={props.day}
        is_week={false}
        updateState={props.updateState}
        week_days={props.week_days}
      />
    </div>
  )
}


export default DayScheduleOverlay;
