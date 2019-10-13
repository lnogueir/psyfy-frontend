import React from 'react'
import Card from 'react-bootstrap/Card'
import GeneralEditIcon from './GeneralEditIcon'
import Helpers from '../assets/js/helpers'
import SweetAlert from 'sweetalert2-react'


class OverviewTrailer extends React.Component{
  constructor(){
    super()
    this.state = {
      youtube_video_id: "agev16vkKHM",
      is_edit:false,
      show_alert: false
    }
  }


  updateYoutubeVideo = () => {
      if(!this.state.is_edit){
          setTimeout(()=>this.refs.linkRef.focus(), 0)
      }else{
        const url = process.env.REACT_APP_LOOPBACK_IP + `/site_profiles/5/updateVideoTrailer`
        const youtube_id = Helpers.validateYouTubeUrl(this.refs.linkRef.value)
        if(youtube_id){
            const new_media_data = {
                source_url: youtube_id,
                media_type: "profile_video_trailer",
            }
            fetch(url, {
              method: "POST",
              body: JSON.stringify(new_media_data),
              headers: {
                'Content-Type': 'application/json',
                'Authorization': "GKLJulXBCcxvwfRTDzb5dB7X6KCBgVh1B1BeCX0BqiUNzJFViAch74K28kggGsk9"
              }
            })
            .then(response=>{
              if(response.status===200){
                this.setState({youtube_video_id: youtube_id})
              }else{
                alert("Error happened when processing your request. Please contact admin.")
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
              We realized that you have not provided a youtube url.\n
              If you would like to add a new trailer, please provide a valid youtube url.
            `}
            type="error"
            confirmButtonText="Ok!"
            confirmButtonColor="#c878fa"
            onConfirm={() => this.setState({ show_alert: false })}
          />
          <Card className="responsive-md-width" style={{textAlign:"left"}}>
            <Card.Header as="h4">
              Trailer
            {
              this.props.is_therapist &&
              <GeneralEditIcon
                is_edit={this.state.is_edit}
                onClick={this.updateYoutubeVideo}
              />
            }
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
              src={`https://www.youtube.com/embed/${this.state.youtube_video_id}`}
              frameBorder="0"
            />
            </Card.Body>
          </Card>
        </React.Fragment>
      )
  }
}

export default OverviewTrailer;
