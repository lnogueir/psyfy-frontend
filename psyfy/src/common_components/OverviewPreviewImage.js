import React from 'react'
import Card from 'react-bootstrap/Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera , faThumbsUp , faThumbsDown , faSpinner } from '@fortawesome/free-solid-svg-icons'


class TherapistOverviewPreviewImage extends React.Component{
  constructor(){
    super();
    this.state={
      selectedFile:null,
      image_src: null,
      is_edit: false,
      is_loading: false
    }
  }


  handleChangeImage = event => {
    const file = event.target.files[0]
    const urlCreator = window.URL || window.webkitURL;
    const imageUrl = urlCreator.createObjectURL(file);
    this.setState((prevState)=>({is_edit:!prevState.is_edit, selectedFile:file, image_src: imageUrl}))
  }

  handleSaveImage = () => {
    const url = process.env.REACT_APP_LOOPBACK_IP + `/site_users/${5}/uploadProfileImage`
    this.setState({is_loading:true})
    var form = new FormData();
    form.append("req", this.state.selectedFile)
    try{
      fetch(url, {
        method: 'POST',
        body: form,
        cache: 'no-cache',
        headers:{
          "Authorization": "woGSD2gPwRzgQ1eymUg05C9N3zxK8Qv9Cm0YOQCJRML3mAvyA1pX1mez2lG0lyIq"
        }
      })
      .then(response=>response.json())
      .then(responseJson=>{
          setTimeout(()=>{
            this.props.handleChangeState('image_src', responseJson.result.media.source_url)
            this.setState(prevState=>({image_src: responseJson.result.media.source_url,is_edit:!prevState.is_edit, is_loading:false}))
          },1000)
      })
    }catch(err){
      alert("Error occurred when uploading image. Please contact support")
    }
  }


  render(){
    return (
      <Card id="therapist-card">
        <Card.Img alt="Profile image" src={this.state.image_src!=null?this.state.image_src:require("../assets/images/profile_fill.png")}/>
        <div className="hover-img">
          <div>
            {
              !this.state.is_edit
              ?
                <label>
                  <FontAwesomeIcon className="camera-icon" icon={faCamera}/>
                  <input type="file" onChange={this.handleChangeImage}/>
                </label>
              :
                <div>
                {
                    !this.state.is_loading
                    ?
                    <div className="row mt30">
                      <div className="col sm-4 lg-4 md-4">
                        <FontAwesomeIcon  className="thumbsup-icon" size="3x" icon={faThumbsDown} />
                      </div>
                      <div className="col sm-4 lg-4 md-4">
                        <FontAwesomeIcon className="thumbsdown-icon" size="3x" icon={faThumbsUp} onClick={this.handleSaveImage}/>
                      </div>
                    </div>
                    :
                    <FontAwesomeIcon icon={faSpinner} spin size="3x"/>
                }
                </div>
            }
          </div>
        </div>
      </Card>

    );
  }
}

export default TherapistOverviewPreviewImage;
