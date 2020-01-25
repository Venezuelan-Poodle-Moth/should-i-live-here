import React, { Component } from 'react';
import Header from './Header.jsx';
import SearchContainer from './SearchContainer.jsx';

class MainContainer extends Component {
  render() {
    return (
      <div>
        <Header />
        <SearchContainer />
      </div>
    )
  }
}

export default MainContainer;
