import React from 'react'
import Card from 'react-bootstrap/Card'
import GeneralEditIcon from '../GeneralEditIcon'
import NumberFormat from 'react-number-format'
import TextField from '@material-ui/core/TextField'
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'
import Checkbox from '@material-ui/core/Checkbox'
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup'
import Utils from '../../assets/js/Utils'


class OverviewClientFocus extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      is_edit: false,
      lower_bound: '',
      upper_bound: '',
      sexuality: [],
      modality: {
        video: { label: "Video Chat", is_active: false },
        individual: { label: "Individual", is_active: true },
        group: { label: "Group", is_active: false },
      }
    }
    this.updateState = Utils.updateStateField.bind(this)
  }

  editClientFocus = () => {
    if (this.state.is_edit) {
      const loggedUser = Utils.getLoggedUser()
      var req = new Utils.Request()
      const endpoint = `/site_profiles/${loggedUser.id}/clientFocus`
      const data = {
        lower_age: this.state.lower_bound,
        upper_age: this.state.upper_bound,
        modality: JSON.stringify(this.state.modality),
        sexuality: this.state.sexuality
      }
      req.setAuthorization(loggedUser.token)
      req.PUT(endpoint, JSON.stringify(data))
        .then(response => {
          if (response.status === 200) {
            response.json().then(client_focus_obj => {
              this.props.onFieldUpdate('client_focus', client_focus_obj)
              this.setState({ is_edit: false })
            })
          } else {
            alert(Utils.ERROR_MESSAGE + " status " + response.status)
          }
        })
      this.setState({ is_edit: false })
    } else {
      this.setState({ is_edit: true })
    }

  }

  handleChangeSexuality = sexuality => {
    this.setState({ sexuality })
  }

  getModalities = () => {
    let selected_modalities = []
    const modalities = this.state.modality
    for (var type in modalities) {
      if (modalities[type].is_active) {
        selected_modalities.push(modalities[type].label)
      }
    }
    return selected_modalities.length == 0 ? 'Not Specified' : selected_modalities.join(', ')
  }


  componentDidMount = () => {
    this.setState({
      lower_bound: this.props.client_focus.lower_age || '',
      upper_bound: this.props.client_focus.upper_age || '',
      sexuality: this.props.client_focus.sexuality || [],
      modality: JSON.parse(this.props.client_focus.modality) || this.state.modality
    })
  }


  render() {
    return (
      <Card align="left" className="responsive-md-width" style={{ borderRadius: '0 0 .25em 0' }}>
        <Card.Header as="h4">
          <span>Client Focus</span>
          <GeneralEditIcon
            is_edit={this.state.is_edit}
            onClick={this.editClientFocus}
          />
        </Card.Header>
        <Card.Body>
          <div className="flex-column">
            <div className="justify-start">
              <b>Target age:</b>
              {
                this.state.is_edit ?
                  <div className="justify-between">
                    <TextField
                      id="lower-bound-price"
                      placeholder="13"
                      value={this.state.lower_bound}
                      className="edit-num-format-overview"
                      onChange={e => this.setState({ lower_bound: e.target.value })}
                      InputProps={{ inputComponent: NumberFormatCustom }}
                      inputProps={{ maxLength: 2 }}
                    />
                    &nbsp;-&nbsp;&nbsp;
                    <TextField
                      id="upper-bound-price"
                      placeholder="20"
                      value={this.state.upper_bound}
                      className="edit-num-format-overview"
                      onChange={e => this.setState({ upper_bound: e.target.value })}
                      style={{ left: '5px' }}
                      InputProps={{ inputComponent: NumberFormatCustom }}
                      inputProps={{ maxLength: 2 }}
                    />
                  </div>
                  :
                  <i>
                    {
                      this.state.lower_bound && this.state.upper_bound ?
                        `${this.state.lower_bound} - ${this.state.upper_bound} years old` :
                        this.state.lower_bound ? `${this.state.lower_bound} years old` :
                          this.state.upper_bound ? `${this.state.upper_bound} years old` :
                            'Not Specified'
                    }
                  </i>
              }
            </div>
            <div className={`justify-start ${this.state.is_edit ? "client-focus-edit-space" : ""}`}>
              <b>Modality:</b>
              {
                this.state.is_edit ?
                  <FormGroup row style={{ position: 'relative', bottom: '9px' }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={() => {
                            let dummy_modality = this.state.modality
                            dummy_modality.individual.is_active = !dummy_modality.individual.is_active
                            this.setState({ modality: dummy_modality })
                          }}
                          icon={<FavoriteBorder />}
                          checkedIcon={<Favorite />}
                          checked={this.state.modality.individual.is_active}
                        />
                      }
                      label="Individual"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={() => {
                            let dummy_modality = this.state.modality
                            dummy_modality.group.is_active = !dummy_modality.group.is_active
                            this.setState({ modality: dummy_modality })
                          }}
                          icon={<FavoriteBorder />}
                          checkedIcon={<Favorite />}
                          checked={this.state.modality.group.is_active}
                        />
                      }
                      label="Group"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={() => {
                            let dummy_modality = this.state.modality
                            dummy_modality.video.is_active = !dummy_modality.video.is_active
                            this.setState({ modality: dummy_modality })
                          }}
                          icon={<FavoriteBorder />}
                          checkedIcon={<Favorite />}
                          checked={this.state.modality.video.is_active}
                        />
                      }
                      label="Video Chat"
                    />
                  </FormGroup>
                  :
                  <i>{this.getModalities()}</i>
              }

            </div>
            <div className="justify-start">
              <b>Sexuality:</b>
              {this.state.is_edit
                ?
                <TagsInput
                  addKeys={[188, 13, 9, 186, 189, 191]}
                  inputProps={{
                    placeholder: this.state.sexuality.length == 0 ? "eg. Homossexual" : "Add sexuality",
                    className: "tagsinput-input"
                  }}
                  tagProps={{
                    className: "tagsinput-tag"
                  }}
                  className="tagsinput-wrap"
                  onlyUnique
                  addOnBlur
                  value={this.state.sexuality}
                  onChange={this.handleChangeSexuality}
                />
                :
                <i>
                  {
                    this.state.sexuality.length === 0
                      ?
                      "Not Specified"
                      :
                      this.state.sexuality.join(', ')
                  }
                </i>
              }
            </div>
          </div>
        </Card.Body>
      </Card>
    )
  }
}

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      isNumericString
    />
  );
}

export default OverviewClientFocus;
