import React, { Component } from 'react';
import MainContainer from './components/MainContainer.jsx';

//App component has no functionality other then rendering main component 
class App extends Component {
  render() {
    return (
      <MainContainer />
    )
  }
}

export default App;
