import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SettingsRounded from '@material-ui/icons/SettingsRounded';
import RELEASE_SRC from '../../assets/images/release.png';
import $ from 'jquery';
import Alert from 'react-bootstrap/Alert'



function PatientPanel(props) {
    const [showHiddenMessage, setShowHiddenMessage] = React.useState(false)
    React.useEffect(() => {
        $('#dear-patient-img').hover(function () {
            setShowHiddenMessage(true)
        }, function () {
            $('.hidden-beta-message-patient').addClass('fadeOutDown')
            setTimeout(() => setShowHiddenMessage(false), 500)
        })
    })
    return (
        <ExpansionPanel defaultExpanded className="exp-panel">
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <h1 className="text-bold-white panel-title">Dear Patient</h1>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className="remove-padding-sm">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12 col-md-6 col-lg-7">
                            <p className="main-home-description">
                                Our Beta testing phase is meant to get our doctors familiar with our platform and make it better for you, therefore the features related to you are disabled.
                                <br /> <br />
                                <b className="good-news-doctor">But don’t worry, official release to patients is coming soon.</b>
                                <br /> <br />
                                Once its available you will be able to get in touch with all our listed doctors and their up-to-date calendar.
                                <br /><br />
                                <b className="good-news-doctor">Want to book an appointment?</b>
                                <br /><br />
                                We made that easier than ever! We have stored all our doctors available hours. You search and  we book it for you!
                            </p>
                        </div>
                        <div className="d-none d-md-block col-md-6 col-lg-5">
                            <img id="dear-patient-img" className="animated panel-img-patient" src={RELEASE_SRC} />
                            {
                                showHiddenMessage &&
                                <div className="animated fadeInUp hidden-beta-message-patient">
                                    <div className="alert-patient">
                                        <SettingsRounded />&nbsp;
                                        <b><i>Official</i></b> release for patients on <b>20/05/2020</b>!
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </ExpansionPanelDetails>
        </ExpansionPanel >
    )
}

export default PatientPanel;