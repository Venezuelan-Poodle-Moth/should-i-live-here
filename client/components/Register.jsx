import React from 'react';
import { Link } from 'react-router-dom';

const Register = (props) => {
  return (
    <form className="auth">
      <input type="text" placeholder="Choose username" required onChange />
      <input type="email" placeholder="Enter email" required onChange />
      <input type="password" placeholder="Choose password" required onChange/>
      <button>Register</button>
      <p className="message">Already have an account? <Link to="/login">Sign In</Link></p>
    </form>
  )
}

export default Register;