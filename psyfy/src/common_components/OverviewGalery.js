import React from 'react'
import Card from 'react-bootstrap/Card'
import GeneralEditIcon from './GeneralEditIcon'

class OverviewGalery extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      is_edit:false
    }
  }

  editGalery = () => {

  }

  render(){
    return(
      <Card style={{width:'55em'}}>
        <Card.Header as="h4">
          Galery
          <GeneralEditIcon
            is_edit={this.state.is_edit}
            onClick={this.editGalery}
          />
        </Card.Header>
        <div style={{width:'100%',height:'450px', alignItems:'center',justifyContent:'center', display:'flex', background:'#3D9970'}}>
          <b>Empty Galery</b>
        </div>
      </Card>
    )
  }

}

export default OverviewGalery;
