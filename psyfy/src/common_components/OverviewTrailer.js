import React from 'react'
import Card from 'react-bootstrap/Card'
import GeneralEditIcon from './GeneralEditIcon'
import Utils from '../assets/js/Utils'
import SweetAlert from 'sweetalert2-react'


class OverviewTrailer extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      is_edit:false,
      show_alert: false,
    }
  }

  componentWillUnmount = () => {
    Utils.Request.abortProcesses()
  }

  updateYoutubeVideo = () => {
      if(!this.state.is_edit){
          setTimeout(()=>this.refs.linkRef.focus(), 0)
      }else{
        const youtube_id = Utils.validateYouTubeUrl(this.refs.linkRef.value)
        if(youtube_id){
            const new_media_data = {
                source_url: youtube_id,
                media_type: "profile_video_trailer",
            }
            const correct_storage = window.localStorage.getItem('loggedUser') || window.sessionStorage.getItem('loggedUser')
            const loggedUser = JSON.parse(correct_storage)
            var req = new Utils.Request()
            req.setAuthorization(loggedUser.token)
            const endpoint = `/site_profiles/${loggedUser.id}/updateVideoTrailer`
            req.POST(endpoint, JSON.stringify(new_media_data))
            .then(response=>{
              if(response.status===200){
                this.props.onFieldUpdate("trailer_id", youtube_id)
              }else{
                alert(Utils.ERROR_MESSAGE)
              }
            })
        }else{
            this.setState({show_alert: true})
        }
      }
      this.setState(prevState=>({is_edit:!prevState.is_edit}))
  }


  render(){
      return (
          <React.Fragment>
            <SweetAlert
              show={this.state.show_alert}
              title="Opps.."
              text = {`
                We realized that you have not provided a youtube URL.\n
                If you would like to add a new trailer, please provide a valid youtube link.
              `}
              type="error"
              confirmButtonText="Ok!"
              confirmButtonColor="#c878fa"
              onConfirm={() => this.setState({ show_alert: false })}
            />
            <Card className="responsive-md-width" style={{textAlign:"left"}}>
              <Card.Header as="h4">
                Trailer
                <GeneralEditIcon
                  is_edit={this.state.is_edit}
                  onClick={this.updateYoutubeVideo}
                />
              </Card.Header>
              {
                this.state.is_edit &&
                <input
                  id="youtube-url-input"
                  ref="linkRef"
                  placeholder="Enter new youtube link..."
                />
              }
              <Card.Body style={{
                  position: "relative",
                  paddingBottom: "56.25%" /* 16:9 */,
                  paddingTop: 25,
                  height: 0
                }}>
              <iframe
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%"
                }}
                src={`https://www.youtube.com/embed/${this.props.trailer_id}`}
                frameBorder="0"
              />
              </Card.Body>
            </Card>
          </React.Fragment>
      )
  }
}

export default OverviewTrailer;
