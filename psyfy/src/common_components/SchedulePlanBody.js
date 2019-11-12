/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import React from 'react'
import {MdDone} from 'react-icons/md'
import Utils from '../assets/js/Utils'
import $ from 'jquery'
import {cellOnClick, updateNotes, setCommonSchedules, setCommonFreeBlocks} from '../assets/js/calendar.js'

class SchedulePlanBody extends React.Component{
  constructor(props){
    super(props)
  } 


  handleMakeAvailableWeek = e => {
    e.preventDefault()
    let elem = Utils.getButtonParent(e.target)
    const correct_storage = window.localStorage.getItem('loggedUser') || window.sessionStorage.getItem('loggedUser')
    const loggedUser = JSON.parse(correct_storage)
    const endpoint = `/site_profiles/${loggedUser.id}/montlyAddAvailableTimes`
    var req = new Utils.Request()
    req.setAuthorization(loggedUser.token)
    let selected_row_index = $(elem).parent().parent().index()
    let block_info = {
      month: this.props.calendar_date.month,
      year: this.props.calendar_date.year,
      weekly_day: this.props.day.day,
      blocks:[selected_row_index]
    }
    req.POST(endpoint, JSON.stringify(block_info))
    .then(response=>{
      if(response.status==200){
          response.json()
          .then(response=>{
            let dummy_week = this.props.week_days
            response = response.result.sort((a,b)=>parseInt(Object.keys(a)[0]) - parseInt(Object.keys(b)[0]))
            for(let i = 0;i < dummy_week[this.props.day.day].days.length;i++){
                let date = dummy_week[this.props.day.day].days[i].date.getDate()
                dummy_week[this.props.day.day].days[i].schedule[selected_row_index].is_available = true
                dummy_week[this.props.day.day].days[i].schedule[selected_row_index].id = response[i][date].created_times[0].id
                let schedule = dummy_week[this.props.day.day].days[i].schedule
                let free_blocks = Utils.scheduleToFreeBlocks(schedule)
                dummy_week[this.props.day.day].days[i].cell.onclick = () => {
                  cellOnClick(
                    dummy_week[this.props.day.day].days[i].cell,
                    this.props.updateState,
                    schedule,
                    free_blocks,
                    dummy_week[this.props.day.day].days[i].date
                  )
                }
                updateNotes(dummy_week[this.props.day.day].days[i].cell, free_blocks)
            }
            setCommonSchedules(dummy_week[this.props.day.day])
            setCommonFreeBlocks(dummy_week[this.props.day.day])
            this.props.updateState('week_days', dummy_week)
            let dummy_day = this.props.day
            dummy_day.schedule = dummy_week[this.props.day.day].common_schedule
            dummy_day.free_blocks = dummy_week[this.props.day.day].free_blocks
            this.props.updateState('day', dummy_day)
          })
      }
      else alert(Utils.ERROR_MESSAGE + 'status: ' + response);
    })
    .catch(err=>alert(Utils.ERROR_MESSAGE + err))
  }



  handleMakeAvailable = e => {
    e.preventDefault()
    let elem = Utils.getButtonParent(e.target)
    const correct_storage = window.localStorage.getItem('loggedUser') || window.sessionStorage.getItem('loggedUser')
    const loggedUser = JSON.parse(correct_storage)
    const endpoint = `/site_profiles/${loggedUser.id}/multiAddAvailableTimes`
    var req = new Utils.Request()
    req.setAuthorization(loggedUser.token)
    let selected_row_index = $(elem).parent().parent().index()
    let block_info = {
      blocks:[selected_row_index],
      month:this.props.day.day.getMonth(),
      year:this.props.day.day.getFullYear(),
      day:this.props.day.day.getDate()
    }
    req.POST(endpoint, JSON.stringify(block_info))
    .then(response=>{
      if(response.status!=200){
        alert(Utils.ERROR_MESSAGE + 'status: ' + response.status)
      }else{
        response.json().then(response=>{
          let dummy_day = this.props.day
          let new_block = response.result.created_times[0]
          let updated_blocks = [new_block]
          dummy_day.free_blocks.forEach(blocks=>{
            updated_blocks = updated_blocks.concat(blocks)
          })
          dummy_day.schedule[selected_row_index].id = new_block.id
          dummy_day.schedule[selected_row_index].is_available = true
          dummy_day.free_blocks = Utils.concatTimes(updated_blocks.sort((a,b)=>a.block-b.block))
          dummy_day.cell.onclick = () => cellOnClick(dummy_day.cell, this.props.updateState, dummy_day.schedule, dummy_day.free_blocks, this.props.day.day)
          updateNotes(dummy_day.cell, dummy_day.free_blocks)
          this.props.updateState('day',dummy_day)
          let dummy_week = this.props.week_days
          let week_day_index = dummy_week[dummy_day.day.getDay()].days.map(day=>day.date).indexOf(dummy_day.day)
          dummy_week[dummy_day.day.getDay()].days[week_day_index].schedule[selected_row_index].is_available = true
          dummy_week[dummy_day.day.getDay()].days[week_day_index].cell = dummy_day.cell
          this.props.updateState('week_days', dummy_week)
        })
      }
    }).catch(err=>alert(Utils.ERROR_MESSAGE + err))
  }

  handleMakeUnavailable = e => {
    e.preventDefault()
    let elem = Utils.getButtonParent(e.target)
    const correct_storage = window.localStorage.getItem('loggedUser') || window.sessionStorage.getItem('loggedUser')
    const loggedUser = JSON.parse(correct_storage)
    const endpoint = `/site_profiles/${loggedUser.id}/multiDeleteAvailableTimes`
    let selected_row_index = $(elem).parent().parent().index()
    var req = new Utils.Request()
    req.setAuthorization(loggedUser.token)
    req.DELETE(endpoint, JSON.stringify({blocks:[this.props.day.schedule[selected_row_index].id]}))
    .then(response=>{
      if(response.status==200){
        let dummy_day = this.props.day
        let updated_blocks = []
        dummy_day.free_blocks.forEach(blocks=>{
          updated_blocks = updated_blocks.concat(blocks)
        })
        updated_blocks = updated_blocks.filter(block=>block.block != selected_row_index)
        dummy_day.free_blocks = Utils.concatTimes(updated_blocks.sort((a,b) => a.block - b.block ))
        delete dummy_day.schedule[selected_row_index].id
        dummy_day.schedule[selected_row_index].is_available = false
        dummy_day.cell.onclick = () => cellOnClick(dummy_day.cell, this.props.updateState, dummy_day.schedule, dummy_day.free_blocks, this.props.day.day)
        updateNotes(dummy_day.cell, dummy_day.free_blocks)
        this.props.updateState('day',dummy_day)
        let dummy_week = this.props.week_days
        let week_day_index = dummy_week[dummy_day.day.getDay()].days.map(day=>day.date).indexOf(dummy_day.day)
        dummy_week[dummy_day.day.getDay()].days[week_day_index].schedule[selected_row_index].is_available = false
        dummy_week[dummy_day.day.getDay()].days[week_day_index].cell = dummy_day.cell
        this.props.updateState('week_days', dummy_week)
      }else{
        alert(Utils.ERROR_MESSAGE + 'status: ' + response.status)
      }
    }).catch(err=>alert(Utils.ERROR_MESSAGE + err))
  }

  handleMakeUnavailableWeek = e => {
    e.preventDefault()
    let elem = Utils.getButtonParent(e.target)
    const correct_storage = window.localStorage.getItem('loggedUser') || window.sessionStorage.getItem('loggedUser')
    const loggedUser = JSON.parse(correct_storage)
    const endpoint = `/site_profiles/${loggedUser.id}/montlyDeleteAvailableTimes`
    var req = new Utils.Request()
    req.setAuthorization(loggedUser.token)
    let selected_row_index = $(elem).parent().parent().index()
    let block_info = {
      month: this.props.calendar_date.month,
      year: this.props.calendar_date.year,
      weekly_day: this.props.day.day,
      blocks:[selected_row_index]
    }
    req.DELETE(endpoint, JSON.stringify(block_info))
    .then(response=>{
      if(response.status==200){
        let dummy_week = this.props.week_days
        for(let i = 0;i < dummy_week[this.props.day.day].days.length;i++){
            dummy_week[this.props.day.day].days[i].schedule[selected_row_index].is_available = false
            delete dummy_week[this.props.day.day].days[i].schedule[selected_row_index].id
            let schedule = dummy_week[this.props.day.day].days[i].schedule
            let free_blocks = Utils.scheduleToFreeBlocks(schedule)
            dummy_week[this.props.day.day].days[i].cell.onclick = () => {
              cellOnClick(
                dummy_week[this.props.day.day].days[i].cell,
                this.props.updateState,
                schedule,
                free_blocks,
                dummy_week[this.props.day.day].days[i].date
              )
            }
            updateNotes(dummy_week[this.props.day.day].days[i].cell, free_blocks)
        }
        setCommonSchedules(dummy_week[this.props.day.day])
        setCommonFreeBlocks(dummy_week[this.props.day.day])
        this.props.updateState('week_days', dummy_week)
        let dummy_day = this.props.day
        dummy_day.schedule = dummy_week[this.props.day.day].common_schedule
        dummy_day.free_blocks = dummy_week[this.props.day.day].free_blocks
        this.props.updateState('day', dummy_day)
      }else{
        alert(Utils.ERROR_MESSAGE + 'status: ' + response.status)
      }
    })
    .catch(err=>alert(Utils.ERROR_MESSAGE + err))
  }


  deleteBlock = (start_block, end_block) => {

  }



  render(){
    return (
      <div className="row">
        <div className="col-xs-12 col-sm-7 schedule-style">
          <div className="flex-column">
            <div align="center">
              <h5><b>Schedule:</b></h5>
            </div>
            <div className="schedule-day">
              {this.props.day && this.props.day.schedule.map(hour_block=>{
                return(
                  <div className={`${!hour_block.is_available?"":"color-green"} justify-around schedule-row-active`}>
                    <div>
                      <b>{hour_block.start}</b>
                    </div>
                    <div>
                      <i className="schedule-row-description">
                        {this.props.is_week?(!hour_block.is_available ? "Not common" : "Common") : (!hour_block.is_available?"Not Available":"Available")}
                      </i>
                      {
                        !hour_block.is_available ?
                        <button onClick={
                          this.props.is_week?
                          this.handleMakeAvailableWeek :
                          this.handleMakeAvailable
                          }
                          className="set-start-block"
                          >
                            <span className="ml5">{this.props.is_week? "Make Common" : "Make Available"}</span>
                        </button>
                        :
                        <button onClick={this.props.is_week? this.handleMakeUnavailableWeek : this.handleMakeUnavailable} className="cancel-set-start-block">
                            <span className="ml5">{this.props.is_week? "Make Uncommon" : "Make Unavailable" }</span>
                        </button>
                      }
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className="col-xs-12 col-sm-5 schedule-plan-style-responsive">
          <div className="flex-column schedule-plan-style">
            <div align="center">
              <h5><b>Plan:</b></h5>
            </div>
            {this.props.day==null || this.props.day.free_blocks.length==0?
              <div className="text-muted calendar-note-busy">
                {this.props.is_week?
                  "No common time set for this day":
                  "No available time set for this day"
                }
              </div>
              :
                <React.Fragment>
                  {this.props.day.free_blocks.map(block=>{
                    return(
                      <div className="m5 text-muted calendar-note-available busy-on-hover">
                          {Utils.DEFAULT_SCHEDULE[block[0].block].start} - {Utils.DEFAULT_SCHEDULE[block[block.length-1].block].end}
                          <a onClick={this.deleteBlock(block[0].block, block[block.length-1].block)}>&times;</a>
                      </div>
                    )
                  })}
                </React.Fragment>

            }
            <div align="center" className="mt10 mb10">
              <button
                className={'w100c btn btn-outline-info'}
                onClick={()=>alert('AAA')}
              >
                <b className="mr3">Clear</b>
                <i style={{position:'relative',bottom:2}}><MdDone/></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SchedulePlanBody;
