import React from 'react'
import Card from 'react-bootstrap/Card'
import GeneralEditIcon from './GeneralEditIcon'
import Utils from '../assets/js/Utils'


class OverviewPreviewSummary extends React.Component{
  constructor(props){
    super(props)
    this.request = new Utils.Request()
    this.state = {
      is_edit: false
    }
  }

  componentWillUnmount = () => {
    Utils.Request.abortProcesses();
  }

  componentDidMount = () => {
    document.getElementById('summary-box').innerHTML = this.props.fields;
  }

  editSummary = () => {
    if(this.state.is_edit){
      var req = new Utils.Request()
      const correct_storage = window.localStorage.getItem('loggedUser') || window.sessionStorage.getItem('loggedUser')
      const loggedUser = JSON.parse(correct_storage)
      req.setAuthorization(loggedUser.token)
      const endpoint = `/site_profiles/${loggedUser.id}`
      const summaryData = {summary: this.refs.summaryNode.innerHTML}
      req.PATCH(endpoint, JSON.stringify(summaryData))
      .then(response=>{if(response.status!=200){alert(Utils.ERROR_MESSAGE)}})
    }else{
        setTimeout(()=>this.refs.summaryNode.focus(), 0)
    }
    this.setState(prevState=>({is_edit:!prevState.is_edit}))
  }

  render(){
    return(
      <Card style={{width:'55em'}}>
        <Card.Header as="h4">
          About
          <GeneralEditIcon
            is_edit={this.state.is_edit}
            onClick={this.editSummary}
          />
        </Card.Header>
        <div className="p10">
          <blockquote className="blockquote">
            <p
              ref="summaryNode"
              placeholder="Here is a good place to highlight your qualifications and experience..."
              className="scrollbox block-horizontal-scroll"
              contentEditable={this.state.is_edit}
              id="summary-box"
            >
            </p>
            <footer className="blockquote-footer">
              <cite title="Source Title">Dr. Lucas Nogueira</cite>
            </footer>
          </blockquote>
        </div>
      </Card>
    )
  }
}

export default OverviewPreviewSummary;
