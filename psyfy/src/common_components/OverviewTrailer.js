import React from 'react'
import Card from 'react-bootstrap/Card'

class OverviewTrailer extends React.Component{
  constructor(){
    super()
    this.state = {
      youtube_video_id: "agev16vkKHM"
    }
  }

  render(){
      return (
        <Card className="responsive-md-width" style={{textAlign:"left"}}>
          <Card.Header as="h4">Trailer</Card.Header>
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
      )
  }
}

export default OverviewTrailer;
