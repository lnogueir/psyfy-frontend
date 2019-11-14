import React from 'react'
import Utils from '../assets/js/Utils'
import Main from '../assets/js/calendar'
import Overlay from './Overlay'
import DayScheduleOverlay from './DayScheduleOverlay'
import WeekScheduleOverlay from './WeekScheduleOverlay'
import { MdArrowForward } from 'react-icons/md'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'


class Calendar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show_day: false,
      show_week: false,
      day: null,
      calendar_date: { month: undefined, year: undefined },
      week_days: undefined
      // is_loading:true
    }
    this.updateState = Utils.updateStateField.bind(this)
  }

  componentDidMount = () => {
    Main(this.updateState)
  }

  componentWillUnmount = () => {
    Utils.Request.abortProcesses()
  }


  render() {
    return (
      <React.Fragment>
        <Overlay
          should_display={this.state.show_day || this.state.show_week}
          toggleDisplay={this.state.show_day ?
            () => this.updateState('show_day', false) :
            () => this.updateState('show_week', false)
          }
          className={"overlay-content-schedule"}
        >
          {
            this.state.show_week
              ?
              <WeekScheduleOverlay
                calendar_date={this.state.calendar_date}
                week_days={this.state.week_days}
                updateState={this.updateState}
                day={this.state.day}
              />
              :
              this.state.show_day
                ?
                <DayScheduleOverlay
                  updateState={this.updateState}
                  day={this.state.day}
                  week_days={this.state.week_days}
                />
                :
                <React.Fragment></React.Fragment>
          }
        </Overlay>
        <div className="card flex-center ml10 mr10">
          <div className="card-header justify-between">
            <h3>{Utils.MONTHS[this.state.calendar_date.month]}, {this.state.calendar_date.year}</h3>
            <span onClick={() => this.setState({ day: undefined, show_week: true })} className="mt9 general-edit-icon cursor-pointer fweight-700">
              Monthly Common Times
              &nbsp;&nbsp;
                    <FontAwesomeIcon icon={faPencilAlt} />
            </span>
          </div>
          <table className="table table-bordered table-calendar-responsive table-fixed" id="calendar">
            <thead>
              <tr>
                <th>Sun</th>
                <th>Mon</th>
                <th>Tue</th>
                <th>Wed</th>
                <th>Thu</th>
                <th>Fri</th>
                <th>Sat</th>
              </tr>
            </thead>
            <tbody id="calendar-body"></tbody>
          </table>
          <div className="justify-start">
            <i id="previous" className="mb10 ml10 next-month-calendar rotate-180">
              <MdArrowForward />
            </i>
            <b className="mt13">{Utils.MONTHS[this.state.calendar_date.month]}</b>
            <i id="next" className="mb10 next-month-calendar">
              <MdArrowForward />
            </i>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Calendar;
