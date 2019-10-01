import React from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

class TherapistImageUpload extends React.Component{
  constructor(){
    super()
    this.state={
      selectedFile:null,
      image_src: null,
      is_edit: false
    }
  }
  // var image_src = this.props.imageSrc;
  handleChangeImage = event => {
    const file = event.target.files[0]
    const urlCreator = window.URL || window.webkitURL;
    const imageUrl = urlCreator.createObjectURL(file);
    this.setState((prevState)=>({is_edit:!prevState.is_edit, selectedFile:file, image_src: imageUrl}))
  }

  handleSaveImage = () => {
    console.log('Image Saved')
    this.setState((prevState)=>({is_edit:!prevState.is_edit}))
  }


  render(){
    return (
      <div id="therapist-card" className="border-2-color">
        <img src={this.state.image_src!=null?this.state.image_src:require("../assets/images/profile_fill.png")}/>
        <h5 className="mt10">Profile picture</h5>
        <hr/>
          {
            !this.state.is_edit
            ?
            <label className="btn btn-primary pointer w200">
              <input type="file" onChange={this.handleChangeImage}/>
              Change Image
            </label>
            :
            <Button className="w200" onClick={this.handleSaveImage} variant="primary">Save</Button>
          }

      </div>
    )
  }
}

export default TherapistImageUpload;
