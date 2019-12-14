import React from 'react'
import Card from 'react-bootstrap/Card'
import GeneralEditIcon from '../../GeneralEditIcon'
import Utils from '../../../assets/js/Utils'
import InputEditorMenu from '../../InputEditorMenu'
import $ from 'jquery'

class OverviewPreviewSummary extends React.Component {
  constructor(props) {
    super(props)
    this.request = new Utils.Request()
    this.state = {
      is_edit: false,
    }
  }

  componentWillUnmount = () => {
    Utils.Request.abortProcesses();
  }

  componentDidMount = () => {
    this.refs.summaryNode.innerHTML = this.props.fields;
    const correct_storage = window.localStorage.getItem('loggedUser') || window.sessionStorage.getItem('loggedUser')
    this.setState({ therapist_name: JSON.parse(correct_storage).name })
  }

  editSummary = () => {
    let editor = $('#menu-editor-summary')
    if (this.state.is_edit) {
      editor.addClass('bounceOutRight')
      var req = new Utils.Request()
      const correct_storage = window.localStorage.getItem('loggedUser') || window.sessionStorage.getItem('loggedUser')
      const loggedUser = JSON.parse(correct_storage)
      req.setAuthorization(loggedUser.token)
      const endpoint = `/site_profiles/${loggedUser.id}`
      const summaryData = { summary: this.refs.summaryNode.innerHTML }
      req.PATCH(endpoint, JSON.stringify(summaryData))
        .then(response => { if (response.status != 200) { alert(Utils.ERROR_MESSAGE) } })
      setTimeout(() => { this.setState(({ is_edit: false })) }, 550)
    } else {
      editor.removeClass('bounceOutRight')
      this.setState(({ is_edit: true }))
      setTimeout(() => this.refs.summaryNode.focus(), 0)
    }

  }

  render() {
    return (
      <Card style={{ width: '55em' }}>
        <Card.Header as="h4">
          <span>About</span>
          <GeneralEditIcon
            is_edit={this.state.is_edit}
            onClick={this.editSummary}
          />
        </Card.Header>
        <div className="p10">
          {this.state.is_edit &&
            <div align="left" id="menu-editor-summary"
              className="animated bounceInRight">
              <InputEditorMenu editor_element={this.refs.summaryNode} />
            </div>
          }
          <blockquote className="blockquote">
            <div
              spellcheck="false"
              ref="summaryNode"
              placeholder="Here is a good place to highlight your qualifications and experience..."
              className={`p10 scrollbox block-horizontal-scroll ${this.state.is_edit ? "summary-box-editing" : ""}`}
              contentEditable={this.state.is_edit}
            >
            </div>
            <footer className="blockquote-footer">
              <cite>{this.props.therapist_name}</cite>
            </footer>
          </blockquote>
        </div>
      </Card>
    )
  }
}

export default OverviewPreviewSummary;
