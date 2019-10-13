import React from 'react'
import Card from 'react-bootstrap/Card'
import GeneralEditIcon from './GeneralEditIcon'


class OverviewPreviewSummary extends React.Component{
  constructor(){
    super()
    this.state = {
      is_edit: false
    }
  }

  updateSummary = () => {
    var summaryData = JSON.stringify({summary: this.refs.summaryNode.innerHTML})
    if(this.state.is_edit){
      const url = process.env.REACT_APP_LOOPBACK_IP + `/site_profiles/5`
      fetch(url,{
        method: "PATCH",
        body: summaryData,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "GKLJulXBCcxvwfRTDzb5dB7X6KCBgVh1B1BeCX0BqiUNzJFViAch74K28kggGsk9"
        }
      })
    }else{
        setTimeout(()=>this.refs.summaryNode.focus(), 10)
    }
    this.setState(prevState=>({is_edit:!prevState.is_edit}))
  }

  render(){
    return(
      <Card style={{width:'55em'}}>
        <Card.Header as="h4">
          Summary
          {
            this.props.is_therapist &&
            <GeneralEditIcon
              is_edit={this.state.is_edit}
              onClick={this.updateSummary}
            />
          }
        </Card.Header>
        <Card.Body>
          <blockquote className="blockquote">
            <p
              ref="summaryNode"
              placeholder="Here is a good place to highlight your qualifications and experience..."
              className="p10 scrollbox block-horizontal-scroll"
              contentEditable={this.state.is_edit}
              id="summary-box"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sintLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint.{' '}
            </p>
            <footer className="blockquote-footer">
              <cite title="Source Title">Dr. Lucas Nogueira</cite>
            </footer>
          </blockquote>
        </Card.Body>
      </Card>
    )
  }
}

export default OverviewPreviewSummary;
