import React from 'react';
import { Link } from 'react-router-dom';

const Login = (props) => {
  return (
    <form className="auth">
      <input type="text" placeholder="Enter username" required onChange/>
      <input type="password" placeholder="Enter password" required onChange/>
      <button>Log In</button>
      <p className="message">Not registered? <Link to="/register">Create an account</Link></p>
    </form>
  )
}

export default Login;