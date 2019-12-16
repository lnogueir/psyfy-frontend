import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileAlt } from '@fortawesome/free-solid-svg-icons'
import DOCUMENT_FILL from '../../../assets/images/document_fill.png'
import Utils from '../../../assets/js/Utils'
import Alert from 'react-bootstrap/Alert'


class AboutTab extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show_error: false
    }
  }

  componentWillUnmount = () => {
    this.props.onChange('about', document.getElementById('req-about').innerHTML)
  }

  componentDidMount = () => {
    document.getElementById('req-about').innerHTML = this.props.about
  }

  onFileChange = e => {
    const new_files = e.target.files;
    if (Utils.validadeFileUpload(new_files)) {
      this.props.onChange('files', this.props.files.concat(Array.from(new_files)))
      this.setState({ show_error: false })
    } else {
      this.setState({ show_error: true })
    }
  }

  render() {
    return (
      <div align="left">
        <h1 className="req-tab-title">Tell us about you</h1>
        <p className="text-muted">This will help us confirm that you are a certified therapist.</p>
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-12">
            <p
              id="req-about"
              placeholder="Tell us about you, your experience and anything that may help us approve your account..."
              className="about-you-body scrollbox block-horizontal-scroll cursor-text"
              contentEditable={true}
            >
            </p>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-12">
            <p>
              <b>Please</b> attach any files you think will be helpful for us to approve your account.
              Such files could be proof of certification, degree and images of your office, for example.
            </p>
          </div>
          <div className="mt10 mb20 col-sm-12 col-md-12 col-lg-12 justify-around flex-wrap">
            <div>
              <label id="file-dialog" className="cursor-pointer">
                <FontAwesomeIcon id="file-icon" style={{ fontSize: 38 }} icon={faFileAlt} />
                <img width={38} height={38} id="file-icon-as-image" src={DOCUMENT_FILL} />
                <input multiple onClick={e => e.target.value = null} onChange={this.onFileChange} type="file" />
                <i>Attach</i>
              </label>
            </div>
            <div className="mt10"><span>{this.props.files.length} files attached</span></div>
            {
              this.props.files.length !== 0 &&
              <div className="mt10 underline cursor-pointer"><b><i><span onClick={e => this.props.onChange('files', [])}>Clear</span></i></b></div>
            }
          </div>
          {this.state.show_error &&
            <div className="ml15 mr15">
              <Alert variant={"danger"}>
                <b>Sorry</b>, the file(s) you have just selected have been discarded due to invalid selection. Please make sure that uploaded files are <i>at most</i> <b>2MB</b> in size and its extensions are for documents or images.
              </Alert>
            </div>
          }
          <div className="col-sm-12 col-md-12 col-lg-12 text-muted">
            <p>
              <b>Note:&nbsp;</b>
              These documents will NOT be exposed to the public and will be deleted as soon as
              the request account process has been completed.
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default AboutTab;
