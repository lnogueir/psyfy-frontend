import React from 'react'
import { FaUserMd} from 'react-icons/fa';
import {MdLocationOn, MdEmail, MdContactPhone } from 'react-icons/md';
import AutocompleteInput from './AutocompleteInput'


function InfoTab(props){

  return (
    <div align="left">
        <h1>Contact Information</h1>
        <p className="text-muted">
          The information below will allow us to create your account and notify you when your request has been processed.
        </p>
        <div className="row">
              <div className="mb-3 col-sm-6">
                  <i className="login-input-icon" ><FaUserMd /></i>
                  <input
                    value={props.name}
                    onChange={e=>props.onChange('name', e.target.value)}
                    type="text"
                    className="login-input"
                    placeholder="Full name"
                  />
              </div>
              <div className="mb-3 col-sm-6">
                  <i className="login-input-icon" ><MdEmail /></i>
                  <input
                    value={props.email}
                    onChange={e=>props.onChange('email', e.target.value)}
                    type="text"
                    className="login-input"
                    placeholder="Login Email"
                  />
              </div>
              <div className="mb-3 col-sm-6">
                  <i
                    className="login-input-icon" ><MdContactPhone /></i>
                  <input
                    value={props.number}
                    onChange={e=>props.onChange('number', e.target.value)}
                    type="text"
                    className="login-input"
                    placeholder="Contact Number"
                  />
              </div>
              <div className="mb-3 col-sm-6">
                  <i className="login-input-icon" ><MdLocationOn /></i>
                  <AutocompleteInput
                    address={props.address}
                    className={'login-input'}
                    onFieldUpdate={props.onChange}
                  />
              </div>
        </div>
        <br/>
        <p>
          Make sure your information is correct, this way we can back to you as soon as possible.<br/>
        </p>
    </div>
  )

}

export default InfoTab;
