import {Link } from "react-router-dom";
import "../index.css"

export default function Navbar(props) {
    return (
      <nav  className="navigation">
              <a href="/" className="brand-name">
        SOMA
      </a>
      <div>

      <div className="search">
        <input
            type="text"
            className="searchTerm"
            placeholder="Search.."
            name="s" 
        />
        <button type="submit" className="searchButton">
        <i className="fa fa-search"></i></button>
        </div>
          <ul>
              <li>
              <Link to={`/home`}>Home</Link>
              </li>
              <li>
              <Link to={`/User`}>Profile</Link>
              </li>
          </ul>
          
          {props.isSignedIn ? (
            <button className="buttonLog" onClick={props.signout}>Log Out</button>
          ) : (
            <button className="buttonLog" onClick={props.signin}>Log In</button>
          )}
        
              
            </div>
      </nav>
      )
  }