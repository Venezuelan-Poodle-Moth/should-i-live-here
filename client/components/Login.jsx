import React from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';

const responseGoogle = (response) => {
  console.log(response);
}
const Login = (props) => {
  const { isLogged } = props;
  return isLogged ? (
    <Redirect to='/results' /> // we can use push here
  ) : (
    <form className="auth" onSubmit={ props.onLoginSubmit }>
      <input type="text" placeholder="Enter email" required />
      <input type="password" placeholder="Enter password" required />
      <button>Log In</button>
      <p className="message">Not registered? <Link to="/register">Create an account</Link></p>
      <GoogleLogin
        clientId="655026135584-0sl40b0opgrga6re9c4j5evclledats7.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </form>
  )
}

export default withRouter(Login);