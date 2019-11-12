import React from 'react';
import Card from 'react-bootstrap/Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFileAlt} from '@fortawesome/free-solid-svg-icons'
import { MdArrowForward } from 'react-icons/md'


class AboutTab extends React.Component{

  componentWillUnmount = () => {
    this.props.onChange('about', document.getElementById('req-about').innerHTML)
  }

  componentDidMount = () => {
    document.getElementById('req-about').innerHTML = this.props.about
  }

  render(){
    return (
      <div align="left">
          <h1>Tell us about you</h1>
          <p style={{lineHeight:"3px"}} className="text-muted">This will help us confirm that you are a certified therapist.</p>
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
                      <b>Please</b> attach any files you think will be helpful for us approve your account.
                      Such files could be proof of certification, degree and images of your office, for example.
                    </p>
                </div>
                <div className="mt10 mb20 col-sm-12 col-md-12 col-lg-12 justify-around">
                  <div>
                    <label id="file-dialog" className="cursor-pointer">
                        <FontAwesomeIcon id="file-icon" style={{fontSize:38}} icon={faFileAlt}/>
                        <img width={38} height={38} id="file-icon-as-image" src={require('../assets/images/document_fill.png')}/>
                        <input multiple onChange={e=>this.props.onChange('files', this.props.files.concat(Array.from(e.target.files)))} type="file"/>
                        <i>Attach</i>
                    </label>
                  </div>
                  <div className="mt10"><span>{this.props.files.length} files attached</span></div>
                  {
                    this.props.files.length !== 0 &&
                    <div className="mt10 underline cursor-pointer"><b><i><span onClick={e=>this.props.onChange('files',[])}>Clear</span></i></b></div>
                  }
                </div>
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
