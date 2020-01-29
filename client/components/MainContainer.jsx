import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './Header.jsx';
import SearchContainer from './SearchContainer.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';
import * as actions from '../actions/actions.js';


const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser,
  isLogged: state.auth.isLogged,
});

const mapDispatchToProps = (dispatch) => ({
  userLoginFetch: (email, password) => dispatch(actions.userLoginFetch(email, password)),
  userCreateFetch: (name, email, password) => dispatch(actions.userCreateFetch(name, email, password)),
  userLogout: () => dispatch(actions.userLogout()),
});


class MainContainer extends Component {
  constructor() {
    super();
    this.onLoginSubmit = this.onLoginSubmit.bind(this);
    this.onRegisterSubmit = this.onRegisterSubmit.bind(this);
    this.onLogoutSubmit = this.onLogoutSubmit.bind(this);
  }


  componentDidUpdate() {
    console.log(this.props);
  }

  onRegisterSubmit(e) {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    this.props.userCreateFetch(name, email, password);
  }

  onLoginSubmit(e) {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    this.props.userLoginFetch(email, password);
  }

  onLogoutSubmit() {
    // console.log('onLogoutSubmit');
    this.props.userLogout();
  }


  render() {
    return (
      <Router>
        <Header onLogoutSubmit={this.onLogoutSubmit} isLogged={this.props.isLogged} />
        <Route exact path="/results" component={SearchContainer} />
        <Route exact path="/user/register" render={(props) => <Register onRegisterSubmit={this.onRegisterSubmit} />} />
        <Route exact path="/" render={(props) => <Login onLoginSubmit={this.onLoginSubmit} isLogged={this.props.isLogged} />} />
      </Router>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
