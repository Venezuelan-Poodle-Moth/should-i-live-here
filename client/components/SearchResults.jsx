import React, { Component } from 'react';
import SearchResult from './SearchResult.jsx';
import MapContainer from './GoogleMap.jsx';
import SearchBar from './SearchBar.jsx';

class SearchResults extends Component {
  render() {
    const { results } = this.props;

    const mapResults = results && results != undefined && <MapContainer location={results[0].location}/>;

    const searchResults = results && results.map(({ address, borough, complaintType, date, description }, i) => {
      return (
        <SearchResult 
          key={`result${i}`}
          address={address} 
          borough={borough}
          complaintType={complaintType}
          date={date}
          description={description}
        />
      )
    })

    return (
      <div className="results">
        <SearchBar address={this.props.address} />
        {/* <form className="search" onSubmit={this.props.address}>
          <input type="text" placeholder="SEARCH FOR YOUR ADDRESS" />
          <select className="borough">
            <option value="brooklyn">Brooklyn</option>
            <option value="queens">Queens</option>
            <option value="manhattan">Manhattan</option>
            <option value="bronx">Bronx</option>
            <option value="staten island">Staten Island</option>
          </select>
          <button>Search</button>
        </form> */}
        <div className="mapContainer">
          {mapResults}
        </div>
        <div className="search-results">
          {searchResults}
        </div>
      </div>
    )
  }
}

export default SearchResults;