import React from 'react'
import Calendar from '../common_components/Calendar'

class CalendarPage extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <React.Fragment>
        <div className="justify-end mr15">
          <h1 className="text-bold-white">My Calendar</h1>
        </div>
        <Calendar />
      </React.Fragment>
    )
  }
}

export default CalendarPage;
