import React from 'react'
import Calendar from '../common_components/Calendar'

class CalendarPage extends React.Component{
  static title = "My Calendar"
  constructor(props){
    super(props)
  }

  componentDidMount = () => {
    this.props.updatePageTitle(CalendarPage.title)
  }

  render(){
    return(
      <div>
        <Calendar />
      </div>
    )
  }
}

export default CalendarPage;
