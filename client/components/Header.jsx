import React from 'react';
import { Link } from 'react-router-dom';

const Header = (props) => {
  const { isLogged } = props;
  return isLogged ? (
    <nav className="navigation">
      <Link to="/results">
        <span className="logo">Should I Live Here?</span>
      </Link>
      <Link className="cta" to="/logout">Log Out</Link>
    </nav>
  ) : (
    <nav className="navigation">
      <Link to="/results">
        <span className="logo">Should I Live Here?</span>
      </Link>
      <div>
        <Link to="/user/login">Login</Link>
        <Link className="cta" to="/user/register">Create Account</Link>
      </div>
    </nav>
  )
}

export default Header;
