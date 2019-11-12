import $ from 'jquery'
import Utils from './Utils'

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let months = Utils.MONTHS;


async function getMonthSchedule(month, year){
  const correct_storage = window.localStorage.getItem('loggedUser') || window.sessionStorage.getItem('loggedUser')
  const loggedUser = JSON.parse(correct_storage)
  const endpoint = `/site_profiles/${loggedUser.id}/availableTimes?filter[where][month]=${month}&filter[where][year]=${year}`
  var req = new Utils.Request()
  req.setAuthorization(loggedUser.token)
  var response = await req.GET(endpoint)
  return response.json()
}


function next(updateState) {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear, updateState);
}

function previous(updateState) {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear, updateState);
}

function addDayNote(cell, content, type){
  $(cell).append(
    `<div class="mt5 text-muted calendar-note-${type}">` +
        content +
    '</div>'
  )
}

function updateNotes(cell, free_times){
  var notes = $(cell).find('div')
  if(notes.length > 0) notes.remove();

  const free_times_length = free_times.length
  if(free_times_length==0){
      addDayNote(cell, "No available time", "busy")
  }else{
      for(var ite=0;ite < free_times_length; ite++){
          if(ite===3){
            addDayNote(
               cell,
               "View more...",
               "more"
            )
            break;
          }
          addDayNote(
             cell,
            `${Utils.DEFAULT_SCHEDULE[free_times[ite][0].block].start} - ${Utils.DEFAULT_SCHEDULE[free_times[ite][free_times[ite].length - 1].block].end}`,
             "available"
          )
      }
  }
}

function setCommonSchedules(week_day){
     let common_schedule = Utils.DEFAULT_SCHEDULE
     for(var j = 0; j < Utils.DEFAULT_SCHEDULE.length; j++){
        let is_active_common_block = true
        for(var x = 0; x < week_day.days.length; x++){
          if(false == week_day.days[x].schedule[j].is_available){
            is_active_common_block = false
            break
          }
        }
        common_schedule[j].is_available = is_active_common_block;
     }
     week_day.common_schedule = common_schedule;
}

function setCommonFreeBlocks(week_day){
    week_day.free_blocks = Utils.scheduleToFreeBlocks(week_day.common_schedule)
}


function cellOnClick(target, updateState, day_schedule, free_times, date){
    updateState('day',
      {
        day: date,
        cell:target,
        schedule: day_schedule,
        free_blocks: free_times,
      }
    );
    updateState('show_day', true);
}

async function showCalendar(month, year, updateState) {
    updateState('calendar_date', {month: month, year: year})
    let week_days = [
      {days: [], common_schedule: undefined},
      {days: [], common_schedule: undefined},
      {days: [], common_schedule: undefined},
      {days: [], common_schedule: undefined},
      {days: [], common_schedule: undefined},
      {days: [], common_schedule: undefined},
      {days: [], common_schedule: undefined}
    ]
    let firstDay = (new Date(year, month)).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();
    const monthly_schedule = await getMonthSchedule(month, year)
    let tbl = document.getElementById("calendar-body"); // body of the calendar
    // clearing all previous cells
    tbl.innerHTML = "";
    // creating all cells
    let date = 1;
    for (let i = 0; i < 6; i++) {
        // creates a table row
        let row = document.createElement("tr");
        //creating individual cells, filing them up with data.
        for (let j = 0; j < 7; j++) {
            const daily_schedule = monthly_schedule.filter(elem=>elem.day === date).sort((a,b)=>a.block-b.block) || []
            const free_times = Utils.concatTimes(daily_schedule)
            if (i === 0 && j < firstDay) {
                let cell = document.createElement("td");
                let cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            else if (date > daysInMonth) {
                break;
            }
            else {
                let cell = document.createElement("td");
                $(cell).addClass('calendar-cell');
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                  if (date >= 10){
                    $(cell).html(`<span class="current-day-bg"><b class="current-day-number-two">${date}</b></span>`)
                  }else{
                    $(cell).html(`<span class="current-day-bg"><b class="current-day-number-one">${date}</b></span>`)
                  }
                }else{
                    $(cell).html(`<b>${date}</b>`)
                }

                updateNotes(cell, free_times)

                let day_schedule = Utils.DEFAULT_SCHEDULE
                daily_schedule.forEach(time=>{
                  for(var iterator = time.block; iterator <= time.block; iterator++){
                    day_schedule[iterator].id = time.id
                    day_schedule[iterator].is_available = true
                  }
                })
                let date_on_cell = date;
                date_on_cell = new Date(year, month , date_on_cell)
                cell.onclick = e => cellOnClick(Utils.getTdParent(e.target), updateState, day_schedule, free_times, date_on_cell)

                week_days[date_on_cell.getDay()].days.push({
                  cell: cell, date: date_on_cell, schedule:day_schedule
                })
                row.appendChild(cell);
                date++;
            }
            setCommonSchedules(week_days[j])
            setCommonFreeBlocks(week_days[j])
        }
        tbl.appendChild(row); // appending each row into calendar body.
    }
    updateState('week_days', week_days)
}

function Main(updateState, week_days) {
  $(document).ready(function(){
      showCalendar(currentMonth, currentYear, updateState, week_days);
      $('#previous').click(function(e){
        e.preventDefault()
        previous(updateState)
      })
      $('#next').click(function(e){
        e.preventDefault()
        next(updateState)
      })
    })
}


export default Main;
export {cellOnClick, updateNotes, setCommonSchedules, setCommonFreeBlocks};
