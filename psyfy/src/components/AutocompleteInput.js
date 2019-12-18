import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';


class AutocompleteInput extends React.Component {
  constructor(props) {
    super(props)

  }

  handleChange = (address) => {
    this.props.onFieldUpdate('address', address)
  }


  render() {
    return (
      <PlacesAutocomplete
        value={this.props.address}
        onSelect={this.handleChange}
        onChange={this.handleChange}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              name={this.props.name}
              type="text"
              value={this.props.address}
              className={this.props.className}
              {...getInputProps({ placeholder: "Clinic Location" })}
            />
            <div className={`autocomplete-dropdown-container${suggestions.length === 0 ? " hidden" : ""}`}>
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item-auto-complete--active'
                  : 'suggestion-item-auto-complete';
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    )
  }

}
export default AutocompleteInput;
