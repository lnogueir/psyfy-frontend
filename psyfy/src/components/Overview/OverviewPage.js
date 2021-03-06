import React from 'react';
import OverviewPreview from './Preview/OverviewPreview';
import Loading from '../Loading';
import OverviewTrailer from './OverviewTrailer';
import OverviewBill from './OverviewBill';
import OverviewGalery from './OverviewGalery';
import OverviewSpeciality from './OverviewSpeciality';
import OverviewClientFocus from './OverviewClientFocus'
import Utils from '../../assets/js/Utils';


class OverviewPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      is_fetching: true,
      preview_info: {
        summary: null,
        image_uri: null,
        card_info: {
          contact_info: {
            full_name: null,
            contact_email: null,
            phone_number: null,
            address: null,
          },
          qualification_info: {
            degree: null,
            specialize: null,
            certification_license: null,
            years_of_experience: null,
          }
        },
      },
      trailer_id: null,
      galery: [],
      finance: null,
      client_focus: null,
      specialities: null
    }
    this.updateStateField = Utils.updateStateField.bind(this)
  }


  updateFieldPreviewSummary = (summary) => {
    var preview_info = Object.assign({}, this.state.preview_info)
    preview_info.summary = summary
    this.setState({ preview_info: preview_info })
  }

  updateFieldPreviewImage = (image_uri) => {
    var preview_info = Object.assign({}, this.state.preview_info)
    preview_info.image_uri = image_uri
    this.setState({ preview_info: preview_info })
  }

  updateFieldPreviewImage = (image_uri) => {
    var preview_info = Object.assign({}, this.state.preview_info)
    preview_info.image_uri = image_uri
    this.setState({ preview_info: preview_info })
  }


  updateFieldPreviewCardContact = (key, value) => {
    var updated_preview_info = Object.assign({}, this.state.preview_info)
    updated_preview_info.card_info.contact_info = Object.assign({}, updated_preview_info.card_info.contact_info, {
      [key]: value
    })
    this.setState({ preview_info: updated_preview_info })
  }

  updateFieldPreviewCardQualification = (key, value) => {
    var updated_preview_info = Object.assign({}, this.state.preview_info)
    updated_preview_info.card_info.qualification_info = Object.assign({}, updated_preview_info.card_info.qualification_info, {
      [key]: value
    })
    this.setState({ preview_info: updated_preview_info })
  }

  initContactInfo = (states, info) => {
    var updated_preview_info = Object.assign({}, states.preview_info)
    return Object.assign({}, updated_preview_info.card_info.contact_info, {
      full_name: info.full_name,
      contact_email: info.contact_email,
      address: info.address,
      phone_number: info.phone_number
    })
  }

  initQualificationInfo = (states, info) => {
    var updated_preview_info = Object.assign({}, states.preview_info)
    return Object.assign({}, updated_preview_info.card_info.qualification_info, {
      degree: info.degree,
      years_of_experience: info.years_of_experience,
      specialize: info.specialize,
      certification_license: info.certification_license
    })
  }

  componentDidMount = () => {
    const loggedUser = Utils.getLoggedUser()
    const endpoint = `/site_profiles/${loggedUser.id}?filter[include]=media&filter[include]=finance&filter[include]=clientFocus&filter[include]=availableTimes&filter[include]=contactInformation&filter[include]=education`
    var req = new Utils.Request()
    req.setAuthorization(loggedUser.token)
    req.GET(endpoint)
      .then(response => response.json())
      .then(responseJson => {
        const medias = responseJson.media;
        medias.forEach(elem => {
          if (elem.media_type === "profile_video_trailer") { this.state.trailer_id = elem.source_url }
          else if (elem.media_type === "profile_image") {
            this.state.preview_info.image_uri = elem.source_url + `?${Utils.getRandomNumber()}`
          } else if (elem.media_type === "gallery_image") {
            this.state.galery.push({ description: elem.description, url: elem.source_url, id: elem.id })
          }
        })
        this.state.preview_info.card_info.qualification_info = this.initQualificationInfo(this.state, responseJson.education)
        this.state.preview_info.card_info.contact_info = this.initContactInfo(this.state, responseJson.contactInformation)
        this.state.preview_info.summary = responseJson.summary
        this.state.finance = responseJson.finance
        this.state.client_focus = responseJson.clientFocus
        this.state.specialities = responseJson.specialities
        this.updateStateField('is_fetching', false)
      })
      .catch(error => {
        alert(Utils.ERROR_MESSAGE + error.message)
      })
  }

  componentWillUnmount = () => {
    Utils.Request.abortProcesses()
  }

  render() {
    return (
      this.state.is_fetching
        ?
        <Loading />
        :
        <React.Fragment>
          <h1 className="ml17 text-bold-white">My Overview</h1>
          <div className="row m15">
            <div style={{ marginTop: 0 }} className="col-xs-12 col-md-12 col-lg-7 overview-preview-wrap">
              <section>
                <OverviewPreview
                  fields={this.state.preview_info}
                  onFieldUpdate={
                    {
                      card_info: {
                        contact_info: this.updateFieldPreviewCardContact,
                        qualification_info: this.updateFieldPreviewCardQualification
                      },
                      summary: this.updateFieldPreviewSummary,
                      image_uri: this.updateFieldPreviewImage
                    }
                  }
                />
                <div className="d-flex justify-content-center">
                  <OverviewGalery
                    galery={this.state.galery}
                    onFieldUpdate={this.updateStateField}
                  />
                </div>
              </section>
            </div>
            <div style={{ marginTop: 0 }} className="col-xs-12 col-md-12 col-lg-5 overview-trailer-wrap">
              <div className="d-flex justify-content-center">
                <OverviewBill
                  finance={this.state.finance}
                  onFieldUpdate={this.updateStateField}
                />
              </div>
              <div className="d-flex justify-content-center">
                <OverviewTrailer
                  onFieldUpdate={this.updateStateField}
                  trailer_id={this.state.trailer_id}
                />
              </div>
              <div align="center">
                <div className="column-wrap-lg column-wrap-sm d-flex justify-content-center responsive-md-width">
                  <OverviewSpeciality
                    specialities={this.state.specialities}
                    onFieldUpdate={this.updateStateField}
                  />
                  <OverviewClientFocus
                    client_focus={this.state.client_focus}
                    onFieldUpdate={this.updateStateField}
                  />
                </div>
              </div>
            </div>
          </div>
        </React.Fragment >
    )
  }


}


export default OverviewPage;
