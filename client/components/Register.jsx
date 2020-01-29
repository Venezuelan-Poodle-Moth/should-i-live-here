import React from 'react';
import { Link } from 'react-router-dom';
import GoogleLogin from 'react-google-login';

const Register = (props) => {
  const { isLogged } = props;
  return isLogged ? (
    <Redirect to='/results' />
  ) : (
    <form className="auth" onSubmit={ props.onRegisterSubmit }>
      <input type="text" placeholder="Choose name" required />
      <input type="email" placeholder="Enter email" required />
      <input type="password" placeholder="Choose password" required />
      <button>Register</button>
      <GoogleLogin clientId = "641921242337-65mqjvq63hbbr1eodrentc936pjpkfn3.apps.googleusercontent.com"
      buttonText = "Sign Up with Google"
      onSuccess = {props.googleSign}
      onFailure = {props.googleSign}
      style = {{marginTop: '20px'}}></GoogleLogin>
      <p className="message">Already have an account? <Link to="/login">Sign In</Link></p>
    </form>
  )
}

export default Register;