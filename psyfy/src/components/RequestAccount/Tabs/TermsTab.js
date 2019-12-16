import React from 'react'
import { Checkbox } from 'pretty-checkbox-react'
import '../../../../node_modules/pretty-checkbox/dist/pretty-checkbox.css'
import TermsAndConditions from '../../TermsAndConditions'

function TermsTab(props) {

  return (
    <div align="left">
      <h1 className="req-tab-title">Terms Of Service</h1>
      <blockquote className="blockquote">
        <div className="p6 border scrollbox-terms-cond-req block-horizontal-scroll">
          <TermsAndConditions />
        </div>
      </blockquote>
      <div className="m5">
        <Checkbox checked={props.accepted_terms} onChange={() => props.onChange('accepted_terms', !props.accepted_terms)} variant="thick" color="success" animation="smooth" shape="curve">
          I agree with the Terms Of Service
        </Checkbox>
      </div>
    </div>
  )
}

export default TermsTab;
