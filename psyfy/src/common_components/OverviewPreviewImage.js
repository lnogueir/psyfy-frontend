import React from 'react'
import Card from 'react-bootstrap/Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera , faThumbsUp , faThumbsDown , faSpinner } from '@fortawesome/free-solid-svg-icons'


class TherapistOverviewPreviewImage extends React.Component{
  constructor(){
    super();
    this.state={
      selectedFile:null,
      is_edit: false,
      is_loading: false,
      preview_src: null
    }
  }


  handleChangeImage = event => {
    const file = event.target.files[0]
    const urlCreator = window.URL || window.webkitURL;
    const imageUrl = urlCreator.createObjectURL(file);
    this.setState((prevState)=>({is_edit:!prevState.is_edit, selectedFile:file, preview_src: imageUrl}))
  }

  handleSaveImage = () => {
    const url = process.env.REACT_APP_LOOPBACK_IP + `/site_profiles/${4}/uploadProfileImage`
    this.setState({is_loading:true})
    var form = new FormData();
    form.append("req", this.state.selectedFile)
    try{
      fetch(url, {
        method: 'POST',
        body: form,
        cache: 'no-cache',
        headers:{
          "Authorization": "EvVH23vJsuhrW3PLDuPB3y0ac6lAzrVOgNIB31OQx1RY3CuougdsmHkJg0evxMtN"
        }
      })
      .then(response=>response.json())
      .then(responseJson=>{
        setTimeout(()=>{
          this.props.handleImageSrc(responseJson.result.media.source_url+`?${Math.floor(Math.random() * 10000)}`)
          this.setState(prevState=>({preview_src: null,is_edit:!prevState.is_edit, is_loading:false}))
        }, 700)
      })
    }catch(err){
      alert("Error occurred when uploading image. Please contact support")
    }
  }

  render(){
    return (
      <Card id="therapist-card">
        <Card.Img alt="Profile image" src={this.state.preview_src==null?this.props.image_src!=null?this.props.image_src:require("../assets/images/profile_fill.png"):this.state.preview_src}/>
        <div className="hover-img">
          <div>
            {
              !this.state.is_edit
              ?
                <label className="mt40">
                  <FontAwesomeIcon className="camera-icon" icon={faCamera}/>
                  <input type="file" onChange={this.handleChangeImage}/>
                </label>
              :
                <div>
                  {
                  !this.state.is_loading
                  ?
                  <div align="center">
                    <h3 style={{fontWeight:700}}>Confirm?</h3>
                    <div className="justify-around mt40">
                        <FontAwesomeIcon
                          onClick={()=>this.setState(prevState=>({preview_src: null,is_edit:!prevState.is_edit, is_loading:false}))}
                          className="thumbsup-icon"
                          icon={faThumbsDown}
                        />
                        <div style={{backgroundColor:"transparent",width:"30px"}}></div>
                        <FontAwesomeIcon
                          className="thumbsdown-icon"
                          icon={faThumbsUp}
                          onClick={this.handleSaveImage}
                        />
                    </div>
                  </div>
                  :
                  <FontAwesomeIcon className="mt40" icon={faSpinner} spin size="3x"/>
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
