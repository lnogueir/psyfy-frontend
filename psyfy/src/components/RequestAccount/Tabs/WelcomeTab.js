import React from 'react'

function WelcomeTab(props) {
  return (
    <div align="left">
      <h1 className="req-tab-title">Welcome to Jawy!!</h1>
      <p>Welcome to PsyCare! We are very happy to know you are interested in joining us.</p>
      <p>In order to get your account, we must first make sure you are a certified doctor.</p>
      <p>
        But don’t worry, if you are a therapist, your account will get approved!
        <br />
        Just follow these steps:
      </p>
      <ol>
        <li>Fill in your contact information. The information you provide there will be initialized on your account and we will use in case we need to contact you.</li>
        <li>Tell us about you, about what you’ve worked with and accomplishments. We also let you upload attachments to help on your application.</li>
        <li>Accept the terms and agreements.</li>
      </ol>
      <p>
        You are all set. We will review your application and let you know about your request status!
      </p>
    </div>
  )
}

export default WelcomeTab;
