import React, { Component } from 'react';
import SearchResult from './SearchResult.jsx';
import Heatmap from './Heatmap.jsx';

class SearchResults extends Component {
  render() {
    const { results } = this.props;
    // console.log("results is: ", results);

    let searchResults;

    if (results !== null && results.length !== 0) {
      searchResults = results && results.map(({ address, borough, complaintType, date, description }, i) => {
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
    } else if (JSON.stringify(results) === '[]') {
      searchResults = <div className="empty-result"><p>No Results Found!</p></div>
    }

    console.log("searchResults: ", searchResults);

    return (
      <div className="results">
        <form className="search" onSubmit={this.props.address}>
          <input type="text" placeholder="SEARCH FOR YOUR ADDRESS" />
          <select className="borough">
            <option value="brooklyn">Brooklyn</option>
            <option value="queens">Queens</option>
            <option value="manhattan">Manhattan</option>
            <option value="bronx">Bronx</option>
            <option value="staten island">Staten Island</option>
          </select>
          <button>Search</button>
        </form>
        <div className="search-results">
          {searchResults}
        </div>
        {results !== null && JSON.stringify(results) !== '[]' &&
          <div className="heatmapWrapper">
            <Heatmap />
          </div>
        }
      </div>
    )
  }
}

export default SearchResults;
