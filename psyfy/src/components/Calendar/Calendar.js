import React from 'react'
import Utils from '../../assets/js/Utils'
import Main from '../../assets/js/calendar'
import Overlay from '../Overlay'
import DayScheduleOverlay from './DayScheduleOverlay'
import WeekScheduleOverlay from './WeekScheduleOverlay'
import GeneralEditIcon from '../GeneralEditIcon'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import Fab from '@material-ui/core/Fab'


class Calendar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show_day: false,
      show_week: false,
      day: null,
      calendar_date: { month: undefined, year: undefined },
      week_days: undefined
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
        <div style={{ borderRadius: '.25em' }} className="card flex-center ml10 mr10">
          <div className="card-header justify-between">
            <span style={{ fontSize: '22px' }}>{Utils.MONTHS[this.state.calendar_date.month]}, {this.state.calendar_date.year}</span>
            <GeneralEditIcon
              is_edit={false}
              onClick={() => this.setState({ day: undefined, show_week: true })}
            />
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
            <div className="mb10 ml10 rotate-180">
              <Fab
                id="previous"
                style={{ display: this.state.tab === 3 ? 'none' : 'block' }}
                size="medium"
                className="next-month-calendar"
              >
                <NavigateNextIcon />
              </Fab>
            </div>
            <b className="mt13">{Utils.MONTHS[this.state.calendar_date.month]}</b>
            <div className="mb10">
              <Fab
                id="next"
                style={{ display: this.state.tab === 3 ? 'none' : 'block' }}
                size="medium"
                className="next-month-calendar"
              >
                <NavigateNextIcon />
              </Fab>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Calendar;
