import React from 'react'

class Page extends React.Component {
  constructor(page_title, loggedUserName, image_src){
      super()
      this.is_therapist = true 
      this.page_title = page_title
      this.user_name = loggedUserName
      this.image_src = image_src
  }


  handlePageTitleUpdate = (new_title) =>{
    this.page_title = new_title
    this.forceUpdate()
  }

  handleUserNameUpdate = (new_name) => {
    this.loggedUserName = new_name
    this.forceUpdate()
  }

  handleImageSrc = (img_src) =>{
    this.image_src = img_src
    this.forceUpdate()
  }


  handleChangeState = (key,value) => {
    this.setState({
      [key]: value
    })
  }

}

export default Page;
