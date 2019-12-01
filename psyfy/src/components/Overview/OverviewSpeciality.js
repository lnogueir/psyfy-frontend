import React from 'react'
import Card from 'react-bootstrap/Card'
import GeneralEditIcon from '../GeneralEditIcon'
import { FaCircle } from 'react-icons/fa'
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'
import Utils from '../../assets/js/Utils'

class OverviewSpeciality extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      is_edit: false,
      specialities: []
    }
  }

  handleChangeSpeciality = specialities => {
    this.setState({ specialities })
  }

  editSpeciality = () => {
    if (this.state.is_edit) {
      const loggedUser = Utils.getLoggedUser()
      var req = new Utils.Request()
      const endpoint = `/site_profiles/${loggedUser.id}`
      req.setAuthorization(loggedUser.token)
      req.PATCH(endpoint, JSON.stringify({
        specialities: this.state.specialities
      })).then(response => {
        if (response.status === 200) {
          response.json().then(speciality_obj => {
            this.props.onFieldUpdate('specialities', speciality_obj)
            this.setState({ is_edit: false })
          })
        } else {
          alert(Utils.ERROR_MESSAGE + " status " + response.status)
        }
      })
    } else {
      this.setState({ is_edit: true })
    }
  }

  componentDidMount = () => {
    this.setState({ specialities: this.props.specialities || [] })
  }

  render() {
    return (
      <Card align="left" className="responsive-md-width">
        <Card.Header as="h4">
          <span>Specialities</span>
          <GeneralEditIcon
            is_edit={this.state.is_edit}
            onClick={this.editSpeciality}
          />
        </Card.Header>
        {
          this.state.is_edit ?
            <TagsInput
              addKeys={[188, 13, 9, 186, 189, 191]}
              inputProps={{
                placeholder: this.state.specialities.length == 0 ? "eg. Depression" : "Add Speciality",
                className: "tagsinput-input"
              }}
              tagProps={{
                className: "tagsinput-tag"
              }}
              className="tagsinput-wrap"
              onlyUnique
              addOnBlur
              value={this.state.specialities}
              onChange={this.handleChangeSpeciality}
            />
            :
            <div align="center" className="speciality-body">
              {
                this.state.specialities.length === 0 ?
                  <i className="ml20"><FaCircle className="speciality-bullet" />&nbsp;Not Specified</i>
                  :
                  this.state.specialities.map((speciality, i) => {
                    return (
                      <React.Fragment>
                        {i % 3 === 0 && i !== 0 && <div className="flex-break" />}
                        <div className="flex-1">
                          <FaCircle className="speciality-bullet" />&nbsp;<b>{speciality}</b>
                        </div>
                      </React.Fragment>
                    )
                  })
              }
              {this.state.specialities.length % 3 === 1 && <div className="flex-2" />}
              {this.state.specialities.length % 3 === 2 && <div className="flex-1" />}
            </div>
        }
      </Card>
    )
  }
}

export default OverviewSpeciality;
