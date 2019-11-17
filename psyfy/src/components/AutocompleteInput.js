import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';


class AutocompleteInput extends React.Component {
  constructor(props){
    super(props)

  }

  handleChange = (address) => {
    this.props.onFieldUpdate('address', address)
  }


  render(){
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
              {...getInputProps({ placeholder:"Clinic Location" })}
            />
            <div className={`autocomplete-dropdown-container${suggestions.length===0?" hidden":""}`}>
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                const style = suggestion.active
                  ? { backgroundColor: '#cde9f7', cursor: 'pointer', padding:10 }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
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
