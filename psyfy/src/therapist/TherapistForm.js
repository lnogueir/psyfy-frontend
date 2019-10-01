import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ReactDOM from 'react-dom';

class TherapistForm extends React.Component{
  constructor(){
    super();
    this.state = {
      is_edit: false
    }
  }


  render(){
    return (
      <Form>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control ref="nameInputNode" disabled={!this.state.is_edit} type="therapistName" placeholder="Enter your name" value={this.props.userInfo.name}/>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridNumber">
            <Form.Label>Contact Number</Form.Label>
            <Form.Control disabled={!this.state.is_edit} placeholder="(123) 456 789" value={this.props.userInfo.number}/>
          </Form.Group>
        </Form.Row>

        <Form.Group controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control disabled={!this.state.is_edit} type="email" placeholder="Your email" value={this.props.userInfo.email}/>
        </Form.Group>

        <Form.Group controlId="formGridAddress1">
          <Form.Label>Clinic Address</Form.Label>
          <Form.Control disabled={!this.state.is_edit}placeholder="1234 Main St" value={this.props.userInfo.clinic_address}/>
        </Form.Group>



        <Form.Row>
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>City</Form.Label>
            <Form.Control disabled={!this.state.is_edit} placeholder="City" value={this.props.userInfo.city}/>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Province</Form.Label>
            <Form.Control disabled={!this.state.is_edit} as="select">
              <option>{this.props.userInfo.province}</option>
              <option>...</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control disabled={!this.state.is_edit} placeholder="XYZ WTU" value={this.props.userInfo.postal_code}/>
          </Form.Group>
        </Form.Row>

        <Form.Group id="formGridCheckbox">
          <Form.Check disabled={!this.state.is_edit} type="checkbox" label="Send me notifications" />
        </Form.Group>

        <Button
          className="w200"
          onClick={()=>{
            this.setState((prevState) => ({is_edit:!prevState.is_edit}))
            let node = ReactDOM.findDOMNode(this.refs.nameInputNode);
            if (node && node.focus instanceof Function) {
              setTimeout(()=>node.focus(), 10)
            }
          }}
          variant="primary"
        >
          {this.state.is_edit?"Update":"Edit"}
        </Button>
      </Form>
    )
  }

}

export default TherapistForm;
