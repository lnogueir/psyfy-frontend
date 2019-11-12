import React from 'react'
import RequestAccountCard from '../common_components/RequestAccountCard'

class RequestAccountPage extends React.Component{

  render(){
    return(
      <div className="ml15">
        <h1 className="text-bold-white">Request your account</h1>
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
