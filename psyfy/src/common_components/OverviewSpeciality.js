import React from 'react'
import Card from 'react-bootstrap/Card'
import GeneralEditIcon from './GeneralEditIcon'
import {FaCircle} from 'react-icons/fa'

class OverviewSpeciality extends React.Component{
  constructor(props){
    super(props)
    this.state = {
        is_edit: false
    }
  }

  editSpeciality = () => {
    this.setState(prevState => ({is_edit:!prevState.is_edit}))
  }

  render(){
    return (
      <Card align="left" className="responsive-md-width">
        <Card.Header as="h4">
          Specialities
          <GeneralEditIcon
            is_edit={this.state.is_edit}
            onClick={this.editSummary}
          />

        </Card.Header>
        <Card.Body>
          <div className="justify-between speciality-wrap flex-wrap">
              <span><i><FaCircle/></i>&nbsp;<b>Anxiety</b></span>
              <span><i><FaCircle/></i>&nbsp;<b>Depression</b></span>
              <span><i><FaCircle/></i>&nbsp;<b>Insonia</b></span>
          </div>
          <div className="justify-between speciality-wrap flex-wrap">
              <span><i><FaCircle/></i>&nbsp;<b>Anxiety</b></span>
              <span><i><FaCircle/></i>&nbsp;<b>Depression</b></span>
              <span><i><FaCircle/></i>&nbsp;<b>Insonia</b></span>
          </div>
        </Card.Body>
      </Card>
    )
  }
}

export default OverviewSpeciality;
