import {Link } from "react-router-dom";
import "../index.css"

export default function Navbar(props) {
    return (
      <nav  className="navigation">
              <a href="/" className="brand-name">
        SOMA
      </a>
      <div>
          <ul>
              <li>
              <Link to={`/home`}>Home</Link>
              </li>
              <li>
              <Link to={`/User`}>Profile</Link>
              </li>
          </ul>
          <li>
          {props.isSignedIn ? (
            <button onClick={props.signout}>Log Out</button>
          ) : (
            <button onClick={props.signin}>Log In</button>
          )}
        </li>
              
            </div>
      </nav>
      )
  }