import React from 'react'
import { FaUserMd } from 'react-icons/fa';
import { MdLocationOn, MdEmail, MdContactPhone } from 'react-icons/md';
import AutocompleteInput from '../../AutocompleteInput'
import NumberFormat from 'react-number-format'

function InfoTab(props) {

  return (
    <div align="left">
      <h1 className="req-tab-title">Contact Information</h1>
      <p className="text-muted">
        The information below will allow us to create your account and notify you when your request has been processed.
        </p>
      <div className="row">
        <div className="mb-3 col-sm-6">
          <i className="login-input-icon" ><FaUserMd /></i>
          <input
            value={props.name}
            onChange={e => props.onChange('name', e.target.value)}
            type="text"
            className="login-input"
            placeholder="Full name"
          />
        </div>
        <div className="mb-3 col-sm-6">
          <i className="login-input-icon" ><MdEmail /></i>
          <input
            value={props.email}
            onChange={e => props.onChange('email', e.target.value)}
            type="email"
            className="login-input"
            placeholder="Login Email"
          />
        </div>
        <div className="mb-3 col-sm-6">
          <i
            className="login-input-icon" ><MdContactPhone /></i>
          <NumberFormat
            onChange={e => props.onChange('number', e.target.value)}
            placeholder="123-456-7890"
            value={props.number}
            format="###-###-####"
            className="login-input"
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
      <br />
      <p>
        Please ensure that the information provided here is correct so our admission team can reach back to you as soon as possible.
        <br />
        <b>Note:&nbsp;</b>if you are a <i>*Beta tester</i> you may skip the next tab as we are aware of your experience and certifications.
        <br />
        * You are considered a Beta tester if you've received an invitation via email from @OUREMAILDOMAIN to become a beta tester.
      </p>
    </div>
  )

}

export default InfoTab;
