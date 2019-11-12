import React from 'react'
import Card from 'react-bootstrap/Card'
import GeneralEditIcon from './GeneralEditIcon'


class OverviewBill extends React.Component{
  constructor(props){
    super(props)
    this.state = {
        is_edit: false
    }
  }

  editBill = () => {
    this.setState(prevState => ({is_edit:!prevState.is_edit}))
  }

  render(){
    return (
        <Card align="left" className="responsive-md-width">
          <Card.Header as="h4">
            Finances
            <GeneralEditIcon
              is_edit={this.state.is_edit}
              onClick={this.editSummary}
            />
          </Card.Header>
          <Card.Body>
            <div className="flex-column">
              <div className="justify-between">
                <span style={{fontSize:'20px'}}><b>Therapy</b></span>
                <div className="justify-start mt5">
                    <i>Price per hour:</i>
                    <b>100$</b>
                </div>
              </div>
              <div className="justify-between">
                <span style={{fontSize:'20px'}}><b>Consultation</b></span>
                <div className="justify-start mt5">
                    <i>Price per hour:</i>
                    <b>75$</b>
                </div>
              </div>
              <br/>
              <div className="justify-start">
                <b>Pay by:</b>
                <i>Cash, Debit, Credit</i>
              </div>
              <div className="justify-start">
                <b>Insurances Supported:</b>
                <i>OHIP, UHIP, Canada Health </i>
              </div>
            </div>
          </Card.Body>
        </Card>
    )
  }
}


export default OverviewBill;
