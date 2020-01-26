import React, { Component } from 'react';

class SearchResults extends Component {
  render() {
    return (
      <div className="results">
        <form className="search">
          <input type="text" placeholder="SEARCH FOR YOUR ADDRESS" />
          <select className="borough">
            <option value="brooklyn">Brooklyn</option>
            <option value="queens">Queens</option>
            <option value="nyc">Manhattan</option>
            <option value="bronx">Bronx</option>
            <option value="staten">Staten Island</option>
          </select>
          <button>Search</button>
        </form>
        <div>

        </div>
      </div>
    )
  }
}

export default SearchResults;
