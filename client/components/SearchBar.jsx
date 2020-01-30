import React, { Component } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
// If you want to use the provided css
//import 'react-google-places-autocomplete/dist/assets/index.css';
 
class SearchBar extends Component {
    render() {
        return (
            <form className="search" onSubmit={this.props.address}>
                <GooglePlacesAutocomplete 
                    placeholder="SEARCH FOR YOUR ADDRESS HERE"/>
                <button>Search</button>
            </form>
        )
    }
};
 
export default SearchBar;