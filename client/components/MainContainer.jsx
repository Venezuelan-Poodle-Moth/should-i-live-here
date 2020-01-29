import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
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
  
  onRegisterSubmit(e) {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    this.props.userCreateFetch(name, email, password);
    this.props.history.push('/');
  }

  onLoginSubmit(e) {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    this.props.userLoginFetch(email, password);
  }

  onLogoutSubmit(e) {
    e.preventDefault();
    this.props.userLogout();
    this.props.history.push('/login'); // push the new route to the history on logout
  }

  render() {
    return (
        <div>
          <Header onLogoutSubmit={ this.onLogoutSubmit } isLogged={ this.props.isLogged }/>
          <Switch>
            <Route exact path="/login" render={() => <Login onLoginSubmit={ this.onLoginSubmit } isLogged={ this.props.isLogged } /> } />
            <Route exact path="/register" render={() => <Register onRegisterSubmit={ this.onRegisterSubmit }/> } />
            <Route exact path="/results" component={SearchContainer} />
            <Route exact path="/" component={SearchContainer} />
          </Switch>
        </div>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MainContainer));
