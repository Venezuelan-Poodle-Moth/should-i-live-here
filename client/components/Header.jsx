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
      <Link to="/results">
        <span className="logo">Should I Live Here?</span>
      </Link>
      {/* onClick value refers to Redux thunk action */}
      <button className="cta"onClick={props.onLogoutSubmit}>Log Out</button>
    </nav>
  ) : (
    <nav className="navigation">
      <Link to="/results">
        <span className="logo">Should I Live Here?</span>
      </Link>
      <div>
        <Link to="/login">Login</Link>
        <Link className="cta" to="/register">Create Account</Link>
      </div>
    </nav>
  )
}

export default Header;
