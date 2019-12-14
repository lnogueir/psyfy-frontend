import 'date-fns';
import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import LocationOn from '@material-ui/icons/LocationOn';
import LocationOff from '@material-ui/icons/LocationOff';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import ScheduleIcon from '@material-ui/icons/Schedule';
import ExploreIcon from '@material-ui/icons/Explore';
import EventNoteIcon from '@material-ui/icons/EventNote';
import SweetAlert from 'sweetalert2-react';
import Paper from '@material-ui/core/Paper';


const timeTheme = createMuiTheme({
    palette: {
        primary: {
            main: "#7986cb"
        }
    }
})


function HomeSearch() {
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [showAlert, setShowAlert] = React.useState(false)
    const handleDateChange = date => {
        setSelectedDate(date);
    };
    const toggleAlert = () => {
        setShowAlert(!showAlert);
    }

    return (
        <div className="home-search-wrap">
            <SweetAlert
                show={showAlert}
                type="info"
                title="Opps..."
                confirmButtonColor='#c5cae9'
                text="Sorry, this functionality will remain disabled until Beta testing is completed."
                onConfirm={toggleAlert}
            />

            <Paper className="home-search-paper" align="center">
                <h1 className="home-search-card-title">
                    Find therapists on PsyCare
                </h1>
                <div align="left">
                    <label className="form-label">
                        <i><ExploreIcon /></i>
                        <b className="explore-label-home">Explore our doctors</b>
                    </label>
                    <input placeholder="What is bothering you?" className="form-control"></input>
                </div>
                <div align="left">
                    <label className="form-label">
                        <i><EventNoteIcon /></i>
                        <b className="explore-label-home">What suits you best?</b>
                    </label>
                    <div className="datetime-home-search-inputs">
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                margin="normal"
                                inputVariant="filled"
                                format="MM/dd/yyyy"
                                color="#7986cb"
                                value={selectedDate}
                                label="Pick Date"
                                onChange={handleDateChange}
                                KeyboardButtonProps={{ color: 'primary' }}
                                animateYearScrolling
                                disablePast
                                className="home-search-datetime-textfiled"
                            />
                            <ThemeProvider theme={timeTheme}>
                                <KeyboardTimePicker
                                    margin="normal"
                                    inputVariant="filled"
                                    label="Pick Time"
                                    keyboardIcon={<ScheduleIcon />}
                                    KeyboardButtonProps={{ color: 'primary' }}
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    className="home-search-datetime-textfiled"
                                />
                            </ThemeProvider>
                        </MuiPickersUtilsProvider>
                    </div>
                </div>
                <div align="left" className="checkbox-search-home">
                    <Checkbox
                        icon={<LocationOff style={{ opacity: 0.5, color: 'black' }} />}
                        checkedIcon={<LocationOn style={{ opacity: 0.85, color: 'black' }} />}
                    />
                    <b>Use my current location</b>
                </div>
                <div align="center">
                    <button
                        className="logbtn"
                        onClick={toggleAlert}
                    >
                        Find
                </button>
                </div>
            </Paper>
        </div>
    );
}

export default HomeSearch;