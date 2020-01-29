import React from 'react';
import { Link, Redirect } from 'react-router-dom';

const Login = (props) => {
  const { isLogged } = props;
  return isLogged ? (
    <Redirect to='/results' />
  ) : (
    <form className="auth" onSubmit={ props.onLoginSubmit }>
      <input type="text" placeholder="Enter email" required />
      <input type="password" placeholder="Enter password" required />
      <button>Log In</button>
      <p className="message">Not registered? <Link to="/user/register">Create an account</Link></p>
    </form>
  )
}

export default Login;