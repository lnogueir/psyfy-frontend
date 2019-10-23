import React from 'react'

class HomePage extends React.Component{
  static title = "Home";
  constructor(props){
    super(props)
  }

  componentDidMount= () => {
      this.props.updatePageTitle(HomePage.title)
  }

  render(){
    return (
      <div style={{height:'500px'}}>
        <h1 className="mt30">Home Page!</h1>
      </div>
    )
  }

}


export default HomePage;
