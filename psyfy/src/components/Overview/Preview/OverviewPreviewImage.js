import React from 'react';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faThumbsUp, faThumbsDown, faSpinner } from '@fortawesome/free-solid-svg-icons';
import Utils from '../../../assets/js/Utils';


class TherapistOverviewPreviewImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      is_edit: false,
      is_loading: false,
      preview_src: null
    }
  }


  componentWillUnmount = () => {
    Utils.Request.abortProcesses();
  }


  handleChangeImage = event => {
    const file = event.target.files[0]
    const urlCreator = window.URL || window.webkitURL;
    const imageUrl = urlCreator.createObjectURL(file);
    this.setState((prevState) => ({ is_edit: !prevState.is_edit, selectedFile: file, preview_src: imageUrl }))
  }


  handleSaveImage = () => {
    const correct_storage = window.localStorage.getItem('loggedUser') || window.sessionStorage.getItem('loggedUser')
    var loggedUser = JSON.parse(correct_storage)
    const endpoint = `/site_profiles/${loggedUser.id}/uploadProfileImage`
    const authToken = loggedUser.token
    this.setState({ is_loading: true })
    var form = new FormData();
    form.append("req", this.state.selectedFile)
    const NOT_JSON = true
    var req = new Utils.Request(NOT_JSON)
    req.setAuthorization(authToken)
    req.POST(endpoint, form)
      .then(response => response.json())
      .then(responseJson => {
        const image_uri = responseJson.result.media.source_url + `?${Utils.getRandomNumber()}`
        this.props.onFieldUpdate(image_uri)
        loggedUser.image_uri = image_uri
        window.localStorage.setItem('loggedUser', loggedUser)
        this.setState(prevState => ({ preview_src: null, is_edit: !prevState.is_edit, is_loading: false }))
      })
      .catch(err => {
        this.setState(prevState => ({ preview_src: null, is_edit: !prevState.is_edit, is_loading: false }))
        alert(Utils.ERROR_MESSAGE + err)
      })
  }

  render() {
    return (
      <Card style={{ height: 'auto', borderRadius: '.25em 0 0 0' }} id="therapist-card">
        <Card.Img style={{ height: '100%' }} alt="Profile image" src={this.state.preview_src == null ? this.props.image_uri != null ? this.props.image_uri : require("../../../assets/images/profile_fill.png") : this.state.preview_src} />
        <div className="hover-img">
          <div>
            {
              !this.state.is_edit
                ?
                <label className="mt40">
                  <FontAwesomeIcon className="camera-icon" icon={faCamera} />
                  <input onClick={e => e.target.value = null} type="file" onChange={this.handleChangeImage} />
                </label>
                :
                <div>
                  {
                    !this.state.is_loading
                      ?
                      <div align="center">
                        <b className="mt40 fs25" style={{ color: "#595966" }}><i>Save?</i></b>
                        <div className="justify-around mt40">
                          <FontAwesomeIcon
                            onClick={() => this.setState(prevState => ({ preview_src: null, is_edit: !prevState.is_edit, is_loading: false }))}
                            className="thumbsup-icon"
                            icon={faThumbsDown}
                          />
                          <div style={{ backgroundColor: "transparent", width: "30px" }}></div>
                          <FontAwesomeIcon
                            className="thumbsdown-icon"
                            icon={faThumbsUp}
                            onClick={this.handleSaveImage}
                          />
                        </div>
                      </div>
                      :
                      <FontAwesomeIcon className="mt40" icon={faSpinner} spin size="3x" />
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
