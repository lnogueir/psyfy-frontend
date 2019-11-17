import React from 'react'
import { Checkbox } from 'pretty-checkbox-react'
import '../../../../node_modules/pretty-checkbox/dist/pretty-checkbox.css'

function TermsTab(props) {

  return (
    <div align="left">
      <h1>Terms & Conditions</h1>
      <blockquote className="blockquote">
        <div className="p10 border scrollbox-terms-cond block-horizontal-scroll">
          <h5>Purchases</h5>
          <p>
            If you wish to purchase any product or service made available through the Service ("Purchase"), you may be asked to supply certain information relevant to your Purchase including, without limitation, your …

            The Purchases section is for businesses that sell online (physical or digital). For the full disclosure section, create your own Terms and Conditions.

            Subscriptions

            Some parts of the Service are billed on a subscription basis ("Subscription(s)"). You will be billed in advance on a recurring ...

            The Subscriptions section is for SaaS businesses. For the full disclosure section, create your own Terms and Conditions.
            </p>

          <h5>Content</h5>
          <p>
            Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for the …

            The Content section is for businesses that allow users to create, edit, share, make content on their websites or apps. For the full disclosure section, create your own Terms and Conditions.

            Links To Other Web Sites

            Our Service may contain links to third-party web sites or services that are not owned or controlled by My Company (change this).

            My Company (change this) has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that My Company (change this) shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services.
            </p>
          <h5>Changes</h5>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 (change this) days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>
          <h5>Contact Us</h5>
          If you have any questions about these Terms, please contact us.
          </div>
      </blockquote>
      <div className="m5">
        <Checkbox checked={props.accepted_terms} onChange={() => props.onChange('accepted_terms', !props.accepted_terms)} variant="thick" color="success" animation="smooth" shape="curve">I agree with PsyCare Terms & Conditions</Checkbox>
      </div>

    </div>
  )
}

export default TermsTab;
