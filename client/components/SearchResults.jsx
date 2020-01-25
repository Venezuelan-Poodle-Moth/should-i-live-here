import React, { Component } from 'react';

class SearchResults extends Component {
  render() {
    return (
      <div>
        <form>
          <input type="text" placeholder="Search for your address" />
          <button>Search</button>
        </form>
      </div>
    )
  }
}

export default SearchResults;
