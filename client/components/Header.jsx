import React from 'react';
import { Link } from 'react-router-dom';

/* 
This header component is conditionally rendering the navigation depending
 on if you're logged in or not
*/
const Header = (props) => {
  const { isLogged } = props;
  return isLogged ? (
    <nav className="navigation">
      <span className="logo">Should I Live Here?</span>
      <Link className="cta" to="/" onClick={props.onLogoutSubmit}>
        Log Out
      </Link>
    </nav>
  ) : (
    <nav className="navigation">
      <span className="logo">Should I Live Here?</span>
      <div>
        <Link to="/">Login</Link>
        <Link className="cta" to="/user/register">Create Account</Link>
      </div>
    </nav>
  )
}

export default Header;
