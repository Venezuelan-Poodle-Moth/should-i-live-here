import React from 'react';

const SearchResult = (props) => {
  return (
    <div className="search-result">
      <p>{props.date}</p>
      <h3>{props.address}</h3>
      <p>{props.borough}</p>
      <p>{props.complaintType}</p>
      <p>{props.description}</p>
    </div>
  );
};

export default SearchResult;
