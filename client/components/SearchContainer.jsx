import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchResults from './SearchResults.jsx';

import * as actions from '../actions/actions.js';

const mapStateToProps = (state) => ({
  results: state.search.current_results,
});

const mapDispatchToProps = (dispatch) => ({
  addressSearch: (address, borough) => dispatch(actions.addressSearch(address, borough)),
});

class SearchContainer extends Component {
  constructor() {
    super();

    this.onSearchSubmit = this.onSearchSubmit.bind(this);
  }

  onSearchSubmit(e) {
    e.preventDefault();
    const address = e.target[0].value;
    // const borough = e.target[1].value;
    const borough = 'ununsed variable';
    this.props.addressSearch(address, borough);
  }

  componentDidMount () {
    const script = document.createElement("script");

    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAbYDUDtfCr6YNmR9nrPYCq5KxBSCDeYek&libraries=places";
    script.async = true;

    document.body.appendChild(script);
  }

  render() {
    return (
      <div>
        <SearchResults 
          address={this.onSearchSubmit} 
          results={this.props.results}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);
