import React from 'react';
import { Link } from 'react-router-dom';

const Register = (props) => {
  return (
    <form className="auth" onSubmit={ props.onRegisterSubmit }>
      <input type="text" placeholder="Choose username" required />
      <input type="email" placeholder="Enter email" required />
      <input type="password" placeholder="Choose password" required />
      <button>Register</button>
      <p className="message">Already have an account? <Link to="/login">Sign In</Link></p>
    </form>
  )
}

export default Register;