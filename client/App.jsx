import React, { Component } from 'react';
import MainContainer from './components/MainContainer.jsx';

class App extends Component {
  render() {
    return (
      <MainContainer>
        <div class="g-signin2" data-onsuccess="onSignIn"></div>
      </MainContainer>
    )
  }
}

export default App;
