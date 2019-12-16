import React from 'react'
import Card from 'react-bootstrap/Card'
import GeneralEditIcon from '../GeneralEditIcon'
import EmptyGaleryIcon from '@material-ui/icons/BubbleChart'
import TrashIcon from '@material-ui/icons/DeleteForeverSharp'
import EditIcon from '@material-ui/icons/Edit'
import AddIcon from '@material-ui/icons/Add'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import Fab from '@material-ui/core/Fab'
import Carousel from 'react-bootstrap/Carousel'
import Swal from 'sweetalert2'
import Utils from '../../assets/js/Utils'
import $ from 'jquery'

class OverviewGalery extends React.Component {
  constructor(props) {
    super(props)
    this.new_items = []
    this.state = {
      is_edit: false,
      galery_item_index: 0
    }
  }


  updateGalery = () => {
    const loggedUser = Utils.getLoggedUser()
    const NOT_JSON = true
    var req = new Utils.Request(NOT_JSON)
    const endpoint = `/site_profiles/${loggedUser.id}/uploadGalleryImages`
    req.setAuthorization(loggedUser.token)
    this.new_items.forEach(item => {
      var form = new FormData();
      form.append("req", item.file)
      req.POST(endpoint, form)
        .then(response => {
          if (response.status !== 200) {
            alert(Utils.ERROR_MESSAGE + 'status: ' + response.status)
          } else {
            response.json().then(response => {
              let dummy_galery = this.props.galery
              dummy_galery.push({
                id: response.result.gallery.id,
                url: response.result.gallery.source_url,
                description: response.result.gallery.description
              })
              this.props.onFieldUpdate('galery', dummy_galery)
            })
          }
        }).catch(err => {
          alert(Utils.ERROR_MESSAGE + err)
        })
    })
    this.new_items = []
  }


  handleAddImage = event => {
    const file = event.target.files[0];
    Swal.fire({
      title: 'New Image Description:',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'on'
      },
      showCancelButton: false,
      confirmButtonText: 'Done',
      showLoaderOnConfirm: true,
      preConfirm: (description) => {
        const loggedUser = Utils.getLoggedUser()
        const NOT_JSON = true
        var req = new Utils.Request(NOT_JSON)
        const endpoint = `/site_profiles/${loggedUser.id}/uploadGalleryImages`
        req.setAuthorization(loggedUser.token)
        var form = new FormData();
        form.append("req", file)
        form.append("description", description)
        req.POST(endpoint, form)
          .then(response => {
            if (response.status !== 200) {
              Swal.showValidationMessage(
                `Request failed: ${response.status}`
              )
            } else {
              response.json().then(response => {
                let dummy_galery = this.props.galery
                dummy_galery.push({
                  id: response.result.gallery.id,
                  url: response.result.gallery.source_url,
                  description: response.result.gallery.description
                })
                const insert_index = dummy_galery.length - 1
                this.props.onFieldUpdate('galery', dummy_galery)
                this.setState({ galery_item_index: insert_index })
              })
            }
          }).catch(err => {
            alert(Utils.ERROR_MESSAGE + err)
          })
      },
      allowOutsideClick: () => !Swal.isLoading()
    })
  }

  editGalery = () => {
    if (this.state.is_edit) {
      this.updateGalery()
      this.setState({ is_edit: false })
    } else { this.setState({ is_edit: true }) }
  }

  nextGaleryItem = () => {
    const index = this.state.galery_item_index
    const galery_size = this.props.galery.length
    this.setState({ galery_item_index: index === galery_size - 1 ? 0 : index + 1 })
  }

  prevGaleryItem = () => {
    const index = this.state.galery_item_index
    const galery_size = this.props.galery.length
    this.setState({ galery_item_index: index === 0 ? galery_size - 1 : index - 1 })
  }

  componentWillUnmount = () => {
    Utils.Request.abortProcesses()
  }

  handleDeleteImage = e => {
    e.stopPropagation();
    Swal.fire({
      title: 'Are you sure?',
      text: "This action will permantly remove this item from your galery",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ffc107',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.value) {
        let img_index = this.state.galery_item_index
        let target_img = this.props.galery[img_index]
        const loggedUser = Utils.getLoggedUser()
        var req = new Utils.Request()
        const endpoint = `/site_profiles/${loggedUser.id}/customDeleteMedia`
        req.setAuthorization(loggedUser.token)
        let data = {
          media_id: target_img.id,
          source_url: target_img.url
        }
        req.DELETE(endpoint, JSON.stringify(data))
          .then(response => {
            if (response.status !== 200) alert(Utils.ERROR_MESSAGE + "status " + response.status)
            else {
              this.setState({ galery_item_index: 0 })
              let dummy_galery = this.props.galery;
              dummy_galery.splice(img_index, 1);
              this.props.onFieldUpdate('galery', dummy_galery)
            }
          })
          .catch(err => alert(Utils.ERROR_MESSAGE + " " + err))

        Swal.fire(
          'Deleted',
          'Item removed successfully.',
          'success'
        )
      }
    })
  }

  updateDescription = () => {
    Swal.fire({
      title: 'Enter image description:',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'on'
      },
      showCancelButton: false,
      confirmButtonText: 'Done',
      showLoaderOnConfirm: true,
      preConfirm: description => {
        let img_index = this.state.galery_item_index
        let target_img = this.props.galery[img_index]
        const loggedUser = Utils.getLoggedUser()
        var req = new Utils.Request()
        const endpoint = `/site_profiles/${loggedUser.id}/media/${target_img.id}`
        req.setAuthorization(loggedUser.token)
        let data = {
          description: description,
          source_url: target_img.url
        }
        req.PUT(endpoint, JSON.stringify(data))
          .then(response => {
            if (response.status !== 200) alert(Utils.ERROR_MESSAGE + "status " + response.status)
            else {
              let dummy_galery = this.props.galery;
              dummy_galery[img_index].description = description;
              this.props.onFieldUpdate('galery', dummy_galery)
            }
          })
          .catch(err => alert(Utils.ERROR_MESSAGE + " " + err))
      },
      allowOutsideClick: () => !Swal.isLoading()
    })
  }

  render() {
    return (
      <React.Fragment>
        <Card style={{ width: '55em', borderRadius: '0 0 0 .25em' }}>
          <Card.Header as="h4">
            <span>Gallery</span>
            <GeneralEditIcon
              is_edit={this.state.is_edit}
              onClick={this.editGalery}
            />
          </Card.Header>
          <div className={`${this.props.galery.length === 0 ? 'empty-galery ' : ''}galery galery-bg`}>
            {
              this.props.galery.length === 0 ?
                <div className="text-bold-white">
                  <EmptyGaleryIcon fontSize='large' />
                  <b>Empty Galery</b>
                </div>
                :
                <Carousel
                  className="galery-img"
                  activeIndex={this.state.galery_item_index}
                  nextIcon={
                    this.props.galery.length !== 0 &&
                    <Fab
                      onClick={this.nextGaleryItem}
                      color="default"
                      style={{ outline: 'none' }}
                      aria-label="Next"
                    >
                      <NavigateNextIcon />
                    </Fab>
                  }
                  prevIcon={
                    <Fab
                      onClick={this.prevGaleryItem}
                      color="default"
                      aria-label="Previous"
                      style={{ outline: 'none' }}
                    >
                      <NavigateNextIcon className="rotate-180" />
                    </Fab>
                  }
                >
                  {
                    this.props.galery.map((elem, index) => {
                      return (
                        <Carousel.Item key={index}>
                          <h3 style={{ position: 'absolute' }} className="galery-item-description">{elem.description}</h3>
                          <img
                            className="galery-img"
                            src={elem.url}
                            alt={elem.description}
                          />
                          <Carousel.Caption>
                            <h4 className="text-bold-white">{index + 1} of {this.props.galery.length}</h4>
                          </Carousel.Caption>
                          {
                            this.state.is_edit && this.props.galery.length !== 0 &&
                            <React.Fragment>
                              <div className="update-galery-description">
                                <Fab
                                  className="update-galery-description-icon"
                                  onClick={this.updateDescription}
                                  variant="extended"
                                >
                                  <EditIcon />
                                  Description
                                </Fab>
                              </div>
                              <div
                                className="add-item-galery"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  $("#add-file-galery").click();
                                }}
                              >
                                <Fab
                                  className="add-item-galery-icon"
                                  aria-label={'Add item'}
                                >
                                  <AddIcon />
                                </Fab>
                              </div>
                              <input
                                id="add-file-galery"
                                onClick={e => { e.target.value = null }}
                                type="file"
                                onChange={this.handleAddImage}
                              />
                              <div
                                className="del-item-galery"
                                onClick={this.handleDeleteImage}
                              >
                                <Fab
                                  className="del-item-galery-icon"
                                  aria-label={'Delete item'}
                                >
                                  <TrashIcon />
                                </Fab>
                              </div>
                            </React.Fragment>
                          }
                        </Carousel.Item>
                      )
                    })
                  }
                </Carousel>
            }
            {
              this.state.is_edit && this.props.galery.length === 0 &&
              <React.Fragment>
                <div
                  className="add-item-galery"
                  onClick={(e) => {
                    e.stopPropagation();
                    $("#add-file-galery").click();
                  }}
                >
                  <Fab
                    className="add-item-galery-icon"
                    aria-label={'Add item'}
                  >
                    <AddIcon />
                  </Fab>
                </div>
                <input
                  id="add-file-galery"
                  onClick={e => { e.target.value = null }}
                  type="file"
                  onChange={this.handleAddImage}
                />
              </React.Fragment>
            }
          </div>
        </Card >
      </React.Fragment>
    )
  }
}

export default OverviewGalery;
