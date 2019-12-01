import React from 'react'
import Card from 'react-bootstrap/Card'
import GeneralEditIcon from '../GeneralEditIcon'
import NumberFormat from 'react-number-format'
import TextField from '@material-ui/core/TextField'
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'
import Utils from '../../assets/js/Utils'


class OverviewBill extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      is_edit: false,
      pay_by: [],
      insurances: [],
      lower_bound: '',
      upper_bound: '',
    }
  }

  handleChangePayBy = pay_by => {
    this.setState({ pay_by })
  }

  handleChangeInsurance = insurances => {
    this.setState({ insurances })
  }

  toggleEdit = () => {
    if (this.state.is_edit) {
      const loggedUser = Utils.getLoggedUser()
      var req = new Utils.Request()
      const endpoint = `/site_profiles/${loggedUser.id}/finance`
      const data = {
        start_price: this.state.lower_bound,
        end_price: this.state.upper_bound,
        pay_by: this.state.pay_by,
        insurance: this.state.insurances
      }
      req.setAuthorization(loggedUser.token)
      req.PUT(endpoint, JSON.stringify(data))
        .then(response => {
          if (response.status === 200) {
            response.json().then(finance_obj => {
              this.props.onFieldUpdate('finance', finance_obj)
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
    this.setState({
      lower_bound: this.props.finance.start_price || '',
      upper_bound: this.props.finance.end_price || '',
      insurances: this.props.finance.insurance || [],
      pay_by: this.props.finance.pay_by || []
    })
  }

  render() {
    return (
      <Card align="left" className="responsive-md-width" style={{ borderRadius: '0 .25em 0 0' }}>
        <Card.Header as="h4">
          <span>Finances</span>
          <GeneralEditIcon
            is_edit={this.state.is_edit}
            onClick={this.toggleEdit}
          />
        </Card.Header>
        <Card.Body>
          <div className="flex-column">
            <div className="justify-start">
              <b>Hourly price range:</b>
              {
                this.state.is_edit ?
                  <div className="justify-between">
                    <TextField
                      id="lower-bound-price"
                      placeholder="$100"
                      value={this.state.lower_bound}
                      onChange={e => this.setState({ lower_bound: e.target.value })}
                      className="edit-num-format-overview"
                      InputProps={{ inputComponent: NumberFormatCustom }}
                      inputProps={{ maxLength: 4 }}
                    />
                    &nbsp;-&nbsp;&nbsp;
                    <TextField
                      id="upper-bound-price"
                      placeholder="$200"
                      value={this.state.upper_bound}
                      className="edit-num-format-overview"
                      onChange={e => this.setState({ upper_bound: e.target.value })}
                      style={{ left: '5px' }}
                      InputProps={{ inputComponent: NumberFormatCustom, }}
                      inputProps={{ maxLength: 5 }}
                    />
                  </div>
                  :
                  <i>
                    {
                      this.state.lower_bound && this.state.upper_bound ?
                        `$${this.state.lower_bound} - $${this.state.upper_bound}` :
                        this.state.lower_bound ? `$${this.state.lower_bound}` :
                          this.state.upper_bound ? `$${this.state.upper_bound}` :
                            'Not Specified'
                    }
                  </i>
              }
            </div>
            <div className="justify-start">
              <b>Pay by:</b>
              {this.state.is_edit
                ?
                <TagsInput
                  addKeys={[188, 13, 9, 186, 189, 191]}
                  inputProps={{
                    placeholder: this.state.pay_by.length == 0 ? "eg. Cash" : "Add method",
                    className: "tagsinput-input"
                  }}
                  tagProps={{
                    className: "tagsinput-tag"
                  }}
                  className="tagsinput-wrap"
                  onlyUnique
                  addOnBlur
                  value={this.state.pay_by}
                  onChange={this.handleChangePayBy}
                />
                :
                <i>
                  {
                    this.state.pay_by.length === 0
                      ?
                      "Not Specified"
                      :
                      this.state.pay_by.join(', ')
                  }
                </i>
              }
            </div>
            <div className="justify-start">
              <b>Insurances:</b>
              {this.state.is_edit
                ?
                <TagsInput
                  addKeys={[188, 13, 9, 186, 189, 191]}
                  inputProps={{
                    placeholder: this.state.insurances.length == 0 ? "eg. OHIP" : "Add insurance",
                    className: "tagsinput-input"
                  }}
                  tagProps={{
                    className: "tagsinput-tag"
                  }}
                  className="tagsinput-wrap"
                  onlyUnique
                  addOnBlur
                  value={this.state.insurances}
                  onChange={this.handleChangeInsurance}
                />
                :
                <i>
                  {
                    this.state.insurances.length === 0
                      ?
                      "Not Specified"
                      :
                      this.state.insurances.join(', ')
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
      thousandSeparator
      isNumericString
      prefix="$"
    />
  );
}

export default OverviewBill;
