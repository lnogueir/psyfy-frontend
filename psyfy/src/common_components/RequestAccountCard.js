import React from 'react';
import Card from 'react-bootstrap/Card'
import { MdArrowForward } from 'react-icons/md'
import WelcomeTab from './WelcomeTab'
import AboutTab from './AboutTab'
import TermsTab from './TermsTab'
import InfoTab from './InfoTab'
import Utils from '../assets/js/Utils'
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import { geocodeByAddress , getLatLng } from 'react-places-autocomplete';
import $ from 'jquery'
import Main from '../assets/js/request_account'
import SweetAlert from 'sweetalert2-react';
import { Route } from 'react-router-dom'


class RequestAccountCard extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        tab:0,
        show_success:false,
        name:'',
        email: '',
        number: '',
        address:'',
        about:'',
        files:[],
        accepted_terms:false,
        show_error: false,
        is_loading: false
      }
      this.updateStateField = Utils.updateStateField.bind(this);
    }

   componentDidMount = () => Main()

   updateTab = () => {
        var tabs = $('.req-tab')
        for(var i=0;i<tabs.length;i++){
            if($(tabs[i]).hasClass('active-tab')){
                this.setState(({tab: i}));
                break;
            }
        }
    }

    hasCompletedTabs = () => {
      return (
        !Utils.isEmptyString(this.state.name) &&
        !Utils.isEmptyString(this.state.number) &&
        !Utils.isEmptyString(this.state.email) &&
        !Utils.isEmptyString(this.state.address) &&
        this.state.accepted_terms
      )
    }

    performRequestAccount = () => {
      if(this.hasCompletedTabs()){
          this.setState({is_loading: true})
          var form = new FormData();
          this.state.files.forEach(file=>form.append('files', file))
          form.append('full_name', this.state.name)
          form.append('phone_number', this.state.number)
          form.append('email', this.state.email)
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
                .then(response=>{
                  if(response.status===200){
                    this.setState({is_loading:false, show_success:true})
                  }
                }).catch(err=>{
                  this.setState({is_loading:false})
                  alert(Utils.ERROR_MESSAGE + err)
                })
            })
            .catch(err=>{
              this.setState({is_loading:false})
              alert(Utils.ERROR_MESSAGE + err)
            })
      }else{
        this.setState({show_error: true})
      }
    }

    handleSuccess = () => {
      this.setState({show_success:false})
      this.props.history.push('/')
    }

    getTab = () => {
       return (
          this.state.tab === 0 ?
          <WelcomeTab /> : this.state.tab === 1?
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
          /> : this.state.tab === 3?
          <TermsTab
            accepted_terms={this.state.accepted_terms}
            onChange={this.updateStateField}
          /> : null
        )
    }

    render(){
        return(
          <React.Fragment>
            <SweetAlert show={this.state.show_success}
              title="Order processed!"
              html={`Our staff is working on the approval of your account!<br/>An email will be sent to you within 24 hours with the response to your request.`}
              type='success'
              showCancelButton={false}
              confirmButtonColor="#9645ff"
              onConfirm={this.handleSuccess}
            />
            <Card className="req-card shadow">
                <div className="row">
                    <div className="col-xm-4 col-md-4 col-lg-4">
                      <div onClick={this.updateTab} className="flex-column req-tabs">
                          <div id="welcome-tab" className="req-tab active-tab">
                              <img className="number-tab" src={require("../assets/images/one.png")}/>
                              <p>Welcome!</p>
                          </div>
                          <div id="info-tab" className="req-tab">
                            <img className="number-tab" src={require("../assets/images/two.png")}/>
                            <p>Contact Info</p>
                          </div>
                          <div id="about-tab" className="req-tab">
                              <img className="number-tab" src={require("../assets/images/three.png")}/>
                              <p>About you</p>
                          </div>
                          <div id="terms-tab" className="req-tab">
                              <img className="number-tab" src={require("../assets/images/four.png")}/>
                              <p>Request Account</p>
                          </div>
                      </div>
                    </div>
                    <div className="col-xm-8 col-md-8 col-lg-8">
                      <div id="tab-wrapper">
                        {this.getTab()}
                        <i onClick={this.updateTab} id="next-tab" style={{display:this.state.tab===3?'none':'block'}}
                          className="m10 mb20 next-tab-icon float-right"
                        >
                          <MdArrowForward />
                        </i>
                        {this.state.tab != 3 ?
                            null:
                            this.state.is_loading?
                            <Spinner className="mt10" animation="border" role="status"/>
                            :
                            <React.Fragment>
                              {this.state.show_error &&
                                <Alert className="mt20" variant={"danger"}>
                                  Sorry, you <b>must accept</b> the Terms & Conditions and <b>fill</b> all the entries on <b>Contact Info</b> tab.
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
            </Card>
          </React.Fragment>
        )
    }
}


export default RequestAccountCard;
