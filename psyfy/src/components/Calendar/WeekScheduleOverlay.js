/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import React from 'react'
import SchedulePlanBody from './SchedulePlanBody'
import Utils from '../../assets/js/Utils'
import $ from 'jquery'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import { setCommonSchedules, setCommonFreeBlocks } from '../../assets/js/calendar.js'

class WeekScheduleOverlay extends React.Component {
  constructor(props) {
    super(props)
    this.dummy_week_days = undefined
    this.state = {
      show_options: false
    }
  }

  mapWeekDay = day_index => {
    return { day: day_index, schedule: this.dummy_week_days[day_index].common_schedule, free_blocks: this.dummy_week_days[day_index].free_blocks }
  }

  handleChangeDay = e => {
    const week_day_index = parseInt($(e.target).attr('value'))
    this.props.updateState('day', this.mapWeekDay(week_day_index))
    this.setState(prevState => ({ show_options: !prevState.show_options }))
  }

  componentDidMount = () => {
    this.dummy_week_days = this.props.week_days
    for (var i = 0; i < 7; i++) {
      setCommonSchedules(this.dummy_week_days[i])
      setCommonFreeBlocks(this.dummy_week_days[i])
    }
    // 1 makes Mondays default day
    this.props.updateState('day', this.mapWeekDay(1))
  }


  render() {
    return this.props.day ?
      (
        <div className="overlay-box-schedule">
          <div align="left" className="schedule-overlay-header">
            <div className="justify-between">
              <h2><b>Select Day:</b></h2>
              <div align="center" className="flex-column week-select">
                <span className="justify-between" onClick={() => this.setState(prevState => ({ show_options: !prevState.show_options }))}>
                  {Utils.WEEK[this.props.day.day]}
                  <i>{this.state.show_options ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}</i>
                </span>
                <div className="week-options-wrap" style={{ display: this.state.show_options ? 'block' : 'none' }}>
                  {Utils.WEEK.map((day, index) => {
                    return <div onClick={this.handleChangeDay} value={index} className="week-options"><b value={index}>{day}</b></div>
                  })}
                </div>
              </div>
            </div>
            <h3>{Utils.WEEK[this.props.day.day]}s</h3>
          </div>
          <SchedulePlanBody
            day={this.props.day}
            updateState={this.props.updateState}
            is_week={true}
            week_days={this.props.week_days}
            calendar_date={this.props.calendar_date}
          />
        </div>
      ) :
      <React.Fragment></React.Fragment>
  }
}

export default WeekScheduleOverlay;
