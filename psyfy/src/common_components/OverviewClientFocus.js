import React from 'react'
import Card from 'react-bootstrap/Card'
import GeneralEditIcon from './GeneralEditIcon'


class OverviewClientFocus extends React.Component{
  constructor(props){
    super(props)
    this.state = {
        is_edit: false
    }
  }

  editClientFocus= () => {
    this.setState(prevState => ({is_edit:!prevState.is_edit}))
  }

  render(){
    return (
      <Card align="left" className="responsive-md-width">
        <Card.Header as="h4">
          Client Focus
          <GeneralEditIcon
            is_edit={this.state.is_edit}
            onClick={this.editClientFocus}
          />
        </Card.Header>
        <Card.Body>
            <div className="flex-column">
              <div className="justify-start">
                  <b>Target age:</b>
                  <i>13 - 25</i>
              </div>
              <div className="justify-start">
                <b>Modality:</b>
                <i>Individual, Group</i>
              </div>
              <div className="justify-start">
                <b>Sexuality:</b>
                <i>Heterossexual, Bisexual, Homossexual</i>
              </div>
            </div>
        </Card.Body>
      </Card>
    )
  }
}

export default OverviewClientFocus;
