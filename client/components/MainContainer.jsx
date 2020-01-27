import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import { connect } from 'react-redux';
import Header from './Header.jsx';
import SearchContainer from './SearchContainer.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';
import { connect } from 'react-redux';
import * as actions from '../actions/actions.js';


const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  isLogged: state.auth.isLogged,
});

const mapDispatchToProps = dispatch => ({
  userLoginFetch: (email, password) => dispatch(actions.userLoginFetch(email, password)),
});

class MainContainer extends Component {
  constructor() {
    super();
    this.onLoginSubmit = this.onLoginSubmit.bind(this);
  }

  onLoginSubmit(e) {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    this.props.userLoginFetch(email, password);
  }

  render() {
    return (
      <Router>
        <Header />
        {/* <Route exact path="/" component={Home} /> */}
        <Route exact path="/results" component={SearchContainer} />
        <Route exact path="/user/login" render={(props) => <Login onLoginSubmit={ this.onLoginSubmit }/> } />
        <Route exact path="/user/register" component={Register} />
      </Router>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
