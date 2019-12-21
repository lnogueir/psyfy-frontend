import React from 'react'
import WelcomeTab from './Tabs/WelcomeTab'
import AboutTab from './Tabs/AboutTab'
import TermsTab from './Tabs/TermsTab'
import InfoTab from './Tabs/InfoTab'
import Utils from '../../assets/js/Utils'
import Spinner from 'react-bootstrap/Spinner'
import Alert from 'react-bootstrap/Alert'
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import $ from 'jquery'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import MenuIcon from '@material-ui/icons/Menu'
import CloseIcon from '@material-ui/icons/Close'
import Fab from '@material-ui/core/Fab'
import SweetAlert from 'sweetalert2-react'
import ONE from '../../assets/images/one.png'
import TWO from '../../assets/images/two.png'
import THREE from '../../assets/images/three.png'
import FOUR from '../../assets/images/four.png'
import Paper from '@material-ui/core/Paper'
import CloseOverlay from '../CloseOverlay'

class RequestAccountCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 0,
      show_success: false,
      name: '',
      email: '',
      number: '',
      address: '',
      about: '',
      files: [],
      accepted_terms: false,
      show_error: false,
      show_error_already_exist: false,
      is_loading: false,
      is_menu_open: false
    }
    this.TAB_MAPPING = [
      { img: ONE, title: "Welcome" },
      { img: TWO, title: "Contact Info" },
      { img: THREE, title: "About you" },
      { img: FOUR, title: "Request Account" }
    ]
    this.updateStateField = Utils.updateStateField.bind(this);
  }

  componentWillUnmount = () => {
    Utils.Request.abortProcesses()
  }

  gotoNextTab = () => {
    this.setState(prevState => ({ tab: prevState.tab + 1 }))
  }

  gotoPrevTab = () => {
    this.setState(prevState => ({ tab: prevState.tab - 1 }))
  }

  hasCompletedTabs = () => {
    return (
      !Utils.isEmptyString(this.state.name) &&
      !Utils.isEmptyString(this.state.number) &&
      !Utils.isEmptyString(this.state.email) &&
      !Utils.isEmptyString(this.state.address) &&
      Utils.isValidEmail(this.state.email) &&
      this.state.accepted_terms
    )
  }

  performRequestAccount = () => {
    if (this.hasCompletedTabs()) {
      this.setState({ is_loading: true })
      var form = new FormData();
      this.state.files.forEach(file => form.append('files', file))
      form.append('full_name', this.state.name)
      form.append('phone_number', this.state.number)
      form.append('email', this.state.email.toLowerCase())
      form.append('address', this.state.address)
      form.append('about', this.state.about)
      geocodeByAddress(this.state.address)
        .then(results => getLatLng(results[0]))
        .then(latLng => {
          form.append('lat', latLng.lat)
          form.append('lng', latLng.lng)
          const NOT_JSON = true
          var req = new Utils.Request(NOT_JSON)
          const endpoint = '/request_accounts/customRequestAccount'
          req.POST(endpoint, form)
            .then(response => {
              if (response.status === 200) {
                this.setState({
                  is_loading: false,
                  show_success: true,
                  show_error: false,
                  show_error_already_exist: false
                })
              } else if (response.error && response.error.code === 'ALREADY_REQUESTED_ACCOUNT') {
                this.setState({
                  is_loading: false,
                  show_success: false,
                  show_error: false,
                  show_error_already_exist: true
                })
              } else {
                this.setState({
                  is_loading: false,
                  show_success: false,
                  show_error: false,
                  show_error_already_exist: false
                })
                alert(Utils.ERROR_MESSAGE + ' status: ' + response.status)
              }
            }).catch(err => {
              this.setState({ is_loading: false })
              alert(Utils.ERROR_MESSAGE + err)
            })
        })
        .catch(err => {
          this.setState({ is_loading: false })
          alert(Utils.ERROR_MESSAGE + err)
        })
    } else {
      this.setState({
        is_loading: false,
        show_success: false,
        show_error: true,
        show_error_already_exist: false
      })
    }
  }

  handleSuccess = () => {
    this.setState({ show_success: false })
    this.props.toggleDisplay()
  }

  handleTabClick = e => {
    let element = Utils.getDivParent(e.target);
    const new_index = $(element).index()
    if (window.innerWidth < 767) {
      this.toggleReqTabs()
    }
    this.setState({ tab: new_index })
  }

  getTab = () => {
    return (
      this.state.tab === 0 ?
        <WelcomeTab /> : this.state.tab === 1 ?
          <InfoTab
            name={this.state.name}
            number={this.state.number}
            address={this.state.address}
            email={this.state.email}
            onChange={this.updateStateField}
          /> : this.state.tab === 2 ?
            <AboutTab
              about={this.state.about}
              files={this.state.files}
              onChange={this.updateStateField}
            /> : this.state.tab === 3 ?
              <TermsTab
                accepted_terms={this.state.accepted_terms}
                onChange={this.updateStateField}
              /> : null
    )
  }

  toggleReqTabs = () => {
    if (this.state.is_menu_open) {
      $('.req-tabs').removeClass('req-tabs-responsive')
      $('.req-tabs-ori').css('display', 'none')
      $('.left-side-req-card').css('flex', '0.4')
    } else {
      $('.req-tabs').addClass('req-tabs-responsive')
      $('.req-tabs-ori').css('display', 'block')
      $('.left-side-req-card').css('flex', '1')
    }
    this.setState(prevState => ({ is_menu_open: !prevState.is_menu_open }))
  }

  render() {
    return (
      <React.Fragment>
        <SweetAlert show={this.state.show_success}
          title="Order processed!"
          html={`
            <div align="left">
              <p style="padding-left:7.5px">
                Our staff is working on the approval of your account!<br/>
                An email will be sent to you within 24 hours with the response to your request.<br/>
                If you don't recieve an email by then, please contact us @ email.
              </p> 
            </div>
            `}
          type='success'
          showCancelButton={false}
          confirmButtonColor="#c5cae9"
          onConfirm={this.handleSuccess}
        />
        <Paper className="req-card shadow">
          <div className="position-relative" style={{ top: 10, right: 10 }}>
            <CloseOverlay onClick={this.props.toggleDisplay} />
          </div>
          <div className="d-flex">
            <div className="left-side-req-card">
              <div className="flex-column req-tabs">
                <div className="menu-req-div">
                  <Fab
                    id="menu-req-but"
                    color="default"
                    onClick={this.toggleReqTabs}
                  >
                    {this.state.is_menu_open ? <CloseIcon /> : <MenuIcon />}
                  </Fab>
                </div>
                <div className="req-tabs-ori">
                  {
                    this.TAB_MAPPING.map((elem, i) => {
                      return (
                        <div key={i} onClick={this.handleTabClick} className={`req-tab${this.state.tab === i ? " active-tab" : ""}`}>
                          <img className="number-tab" src={elem.img} />
                          <p>{elem.title}</p>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            </div>
            <div className="right-side-req-card">
              <div id="tab-wrapper">
                {this.getTab()}
                <div className="mb20 float-left rotate-180">
                  <Fab
                    style={{ display: this.state.tab === 0 || this.state.tab === 3 ? 'none' : 'block' }}
                    onClick={this.gotoPrevTab}
                    size="medium"
                    className="next-tab-icon"
                  >
                    <NavigateNextIcon />
                  </Fab>
                </div>
                <div className="mb20 float-right">
                  <Fab
                    style={{ display: this.state.tab === 3 ? 'none' : 'block' }}
                    onClick={this.gotoNextTab}
                    size="medium"
                    className="next-tab-icon"
                  >
                    <NavigateNextIcon />
                  </Fab>
                </div>
                {this.state.tab != 3 ?
                  null :
                  this.state.is_loading ?
                    <Spinner className="mt10" animation="border" role="status" />
                    :
                    <React.Fragment>
                      {this.state.show_error &&
                        <Alert className="mt20" variant={"danger"}>
                          Sorry, you <b>must accept</b> the Terms Of Service, <b>fill</b> all the entries on <b>Contact Info</b> tab and provide a <b>valid</b> email address.
                        </Alert>
                      }
                      {
                        this.state.show_error_already_exist &&
                        <Alert className="mt20" variant={"danger"}>
                          There is already an account request for this email being processed at the time.
                          If you've already requested an account with this email, a response will be sent to you shortly.
                        </Alert>
                      }
                      <button className="logbtn mt10" onClick={this.performRequestAccount}>
                        Request Account
                      </button>
                    </React.Fragment>
                }
              </div>
            </div>
          </div>
        </Paper>
      </React.Fragment>
    )
  }
}

export default RequestAccountCard;
