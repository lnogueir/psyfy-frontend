import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import EditPreviewCardOverlay from './EditPreviewCardOverlay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapPin } from '@fortawesome/free-solid-svg-icons';
import GeneralEditIcon from '../../GeneralEditIcon';
import Overlay from '../../Overlay';
import Utils from '../../../assets/js/Utils';

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
            <span>{this.props.fields.contact_info.full_name}</span>
            <GeneralEditIcon
              is_edit={false}
              onClick={() => this.toggleDisplay('should_display_edit', true)}
            />
          </Card.Header>
          <Card.Body>
            <div>
              <div style={{ lineHeight: "25px" }} className="justify-between">
                <span className="fweight-700">{this.props.fields.qualification_info.degree}</span>
                <i>{this.props.fields.qualification_info.specialize}</i>
              </div>
              <br />
              <FontAwesomeIcon
                style={{ fontSize: "20px" }}
                icon={faMapPin}
              />
              &nbsp;&nbsp;{this.props.fields.contact_info.address}
            </div>
            <div className="mt20 justify-around">
              <Button
                className="m5 w150 fweight-700 radius-button"
                variant="secondary"
              >
                Contact
                </Button>
              <Button
                style={{ backgroundColor: "#8c5ccc", borderColor: "#8c5ccc" }}
                className="m5 w150 fweight-700 radius-button"
                variant="secondary"
              >
                Appointment
                </Button>
            </div>
          </Card.Body>
        </Card>
      </React.Fragment>
    )
  }
}

export default OverviewPreviewCard;
