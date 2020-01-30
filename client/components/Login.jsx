import React, {Component} from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { connect } from 'react-redux';
import * as actions from '../actions/actions.js';

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  userGmailFetch: (email) => dispatch(actions.userGmailFetch(email)),
});



class Login extends Component {

  constructor() {
    super();
    this.theSuccess = this.theSuccess.bind(this);
  }

  responseGoogle (response) {
  
  };
  
  theSuccess(googleUser) {
   const gmail = googleUser.getBasicProfile().getEmail();
   const name = googleUser.getBasicProfile().getName();
   const id = googleUser.getBasicProfile().getId()
   console.log(id, gmail, name)
   this.props.userGmailFetch(gmail);
  };
  
  render() {
    const isLogged = this.props.isLogged;
    return isLogged ? (
      <Redirect to='/results' /> // we can use push here
    ) : (
      <form className="auth" onSubmit={ this.props.onLoginSubmit }>
        <input type="text" placeholder="Enter email" required />
        <input type="password" placeholder="Enter password" required />
        <button>Log In</button>
        <p className="message">Not registered? <Link to="/register">Create an account</Link></p>
        <GoogleLogin
          clientId="655026135584-0sl40b0opgrga6re9c4j5evclledats7.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={this.theSuccess}
          onFailure={this.responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
      </form>
    )
  }
}

// export default withRouter(Login);
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));