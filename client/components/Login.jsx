import React from 'react';
import { Link } from 'react-router-dom';

const Login = (props) => {
  console.log('made it to Login component!')
  return (
    <form className="auth" onSubmit={ props.onLoginSubmit }>
      <input type="text" placeholder="Enter username" required />
      <input type="password" placeholder="Enter password" required />
      <button>Log In</button>
      <p className="message">Not registered? <Link to="/register">Create an account</Link></p>
    </form>
  )
}

export default Login;