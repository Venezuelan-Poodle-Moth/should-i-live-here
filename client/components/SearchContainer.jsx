import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchResults from './SearchResults.jsx';

import * as actions from '../actions/actions.js';

const mapStateToProps = (state) => ({
  results: state.search.current_results,
  userId: state.auth.currentUser.id,
});

const mapDispatchToProps = (dispatch) => ({
  addressSearch: (address, borough, userId) => dispatch(actions.addressSearch(address, borough, userId)),
});

class SearchContainer extends Component {
  constructor() {
    super();

    this.onSearchSubmit = this.onSearchSubmit.bind(this);
  }

  onSearchSubmit(e) {
    e.preventDefault();
    const address = e.target[0].value;
    const borough = e.target[1].value;
    const id = this.props.userId;
    this.props.addressSearch(address, borough, id);
  }

  render() {
    return (
      <SearchResults 
        address={this.onSearchSubmit} 
        results={this.props.results}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);
