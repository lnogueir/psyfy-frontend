import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import WbIncandescent from '@material-ui/icons/WbIncandescent';
import LAMP_SRC from '../../assets/images/lamp.png';
import $ from 'jquery';
import Alert from 'react-bootstrap/Alert'



function DoctorPanel(props) {
    const [showHiddenMessage, setShowHiddenMessage] = React.useState(false)
    React.useEffect(() => {
        $('#dear-doctor-img').hover(function () {
            setShowHiddenMessage(true)
        }, function () {
            $('.hidden-beta-message').addClass('fadeOutDown')
            setTimeout(() => setShowHiddenMessage(false), 500)
        })
    })
    return (
        <ExpansionPanel defaultExpanded className="exp-panel">
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <h1 className="text-bold-white panel-title">Dear Therapist</h1>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className="remove-padding-sm">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12 col-md-6 col-lg-7">
                            <p className="main-home-description">
                                We have finally released it! <br />
                                We've convocated you to become part of us!
                            </p>
                            <b className="good-news-doctor">Here's why this is good news:</b>
                            <ul className="doctor-list-benefits">
                                <li>You get listed for thousands of patients.</li>
                                <li>You can customize your page to highlight your skills, add videos and images to show your work environment and more.</li>
                                <li>We give you a brand new <i>Calendar</i> for you to set your times so patients can easily plan with you.</li>
                                <li><b>It's 100% free</b></li>
                            </ul>
                        </div>
                        <div className="d-none d-md-block col-md-6 col-lg-5">
                            <img id="dear-doctor-img" className="animated panel-img" src={LAMP_SRC} />
                            {
                                showHiddenMessage &&
                                <div className="animated fadeInUp hidden-beta-message">
                                    <Alert variant="warning">
                                        <WbIncandescent />&nbsp;
                                        Get your account and <i><b>Beta Test</b></i>!
                                    </Alert>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )
}

export default DoctorPanel;