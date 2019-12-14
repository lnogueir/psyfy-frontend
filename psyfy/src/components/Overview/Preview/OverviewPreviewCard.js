import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from '@material-ui/core/Button';
import EditPreviewCardOverlay from './EditPreviewCardOverlay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapPin, faCertificate, faBriefcase } from '@fortawesome/free-solid-svg-icons';
import GeneralEditIcon from '../../GeneralEditIcon';
import Overlay from '../../Overlay';
import Utils from '../../../assets/js/Utils';
import PhoneIcon from '@material-ui/icons/PhoneIphone';
import MailIcon from '@material-ui/icons/MailOutline';

class OverviewPreviewCard extends React.Component {
    constructor() {
        super()
        this.state = {
            should_display_edit: false
        }
        this.toggleDisplay = Utils.updateStateField.bind(this)
    }

    render() {
        return (
            <React.Fragment>
                <Overlay
                    toggleDisplay={() => this.toggleDisplay('should_display_edit', false)}
                    should_display={this.state.should_display_edit}
                    className={"overlay-content-preview"}
                >
                    <EditPreviewCardOverlay
                        fields={this.props.fields}
                        onFieldUpdate={this.props.onFieldUpdate}
                    />
                </Overlay>
                <Card id="overview-preview-card">
                    <Card.Header as="h4">
                        <span>
                            {Utils.getSplittedFullName(this.props.fields.contact_info.full_name)}
                        </span>
                        <GeneralEditIcon
                            is_edit={false}
                            onClick={() => this.toggleDisplay('should_display_edit', true)}
                        />
                    </Card.Header>
                    <Card.Body>
                        <div>
                            <div style={{ lineHeight: "25px" }} className="justify-between">
                                <span className="card-degree-title">{this.props.fields.qualification_info.degree}</span>
                                {
                                    this.props.fields.qualification_info.specialize &&
                                    <i className="card-spec-title">{this.props.fields.qualification_info.specialize}</i>
                                }
                            </div>
                            <div className="card-qualification-title">
                                {
                                    this.props.fields.qualification_info.certification_license &&
                                    <span>
                                        <FontAwesomeIcon icon={faCertificate} />
                                        &nbsp;{this.props.fields.qualification_info.certification_license}
                                    </span>
                                }
                                {
                                    this.props.fields.qualification_info.years_of_experience &&
                                    <span>
                                        <FontAwesomeIcon icon={faBriefcase} />
                                        &nbsp;{this.props.fields.qualification_info.years_of_experience} years
                  </span>
                                }
                            </div>
                            {
                                this.props.fields.contact_info.address &&
                                <div className="card-location-title">
                                    <a href={`http://maps.google.com/?q=${this.props.fields.contact_info.address}`}>
                                        <FontAwesomeIcon icon={faMapPin} />
                                        &nbsp;&nbsp;{this.props.fields.contact_info.address}
                                    </a>
                                </div>
                            }
                            <div className="call-mail-wrapper">
                                <a href={`tel:+${1}-${this.props.fields.contact_info.phone_number}`}>
                                    <Button
                                        startIcon={<PhoneIcon />}
                                        size="medium"
                                        variant="contained"
                                        className="call-me-but"
                                    >
                                        {
                                            this.props.fields.contact_info.phone_number ?
                                                this.props.fields.contact_info.phone_number :
                                                "Not Specified"
                                        }
                                    </Button>
                                </a>
                                <a href={`mailto: ${this.props.fields.contact_info.contact_email}`}>
                                    <Button
                                        startIcon={<MailIcon />}
                                        size="medium"
                                        variant="contained"
                                        className="email-me-but"
                                    >
                                        {
                                            this.props.fields.contact_info.contact_email ?
                                                "Email Me" :
                                                "Not Specified"
                                        }
                                    </Button>
                                </a>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </React.Fragment >
        )
    }
}

export default OverviewPreviewCard;
