import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './Header.jsx';
import SearchContainer from './SearchContainer.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';

class MainContainer extends Component {
  render() {
    return (
      <Router>
        <Header />
        {/* <Route exact path="/" component={Home} /> */}
        <Route exact path="/results" component={SearchContainer} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Router>
    )
  }
}

export default MainContainer;
