import React from 'react'
import RequestAccountCard from './RequestAccountCard'

class RequestAccountPage extends React.Component {

  render() {
    return (
      <div>
        <h1 className="text-bold-white ml15">Request your account</h1>
        <div align="center">
          <RequestAccountCard
            history={this.props.history}
          />
        </div>
      </div>
    )
  }
}

export default RequestAccountPage;
