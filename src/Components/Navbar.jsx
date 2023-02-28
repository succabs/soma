import {Link } from "react-router-dom";
import "../index.css"

export default function Navbar() {
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
              <li>
              <Link to={`/asd`}>Log out</Link>
              </li>
          </ul>
            </div>
      </nav>
      )
  }