import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import GoogleLogin from 'react-google-login';

const Login = (props) => {
  const { isLogged } = props;
  return isLogged ? (
    <Redirect to='/results' />
  ) : (
    <form className="auth" onSubmit={ props.onLoginSubmit }>
      <input type="text" placeholder="Enter email" required />
      <input type="password" placeholder="Enter password" required />
      <button>Log In</button>
      <GoogleLogin clientId = "641921242337-65mqjvq63hbbr1eodrentc936pjpkfn3.apps.googleusercontent.com"
      buttonText = "Login"
      onSuccess = {props.googleLog}
      onFailure = {props.googleLog}
      style = {{margin: '20px'}}></GoogleLogin>
      {/* <a href="https://github.com/login/oauth/authorize?scope=user:email&client_id=09fe246fe5c73039cbd1">Click here to begin!</a> */}
      <p className="message">Not registered? <Link to="/register">Create an account</Link></p>
    </form>
  )
}

export default Login;