import {Link } from "react-router-dom";
import "../index.css"
import { useState } from "react";

export default function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };
    return (
      <nav  className="navigation">
              <a href="/" className="brand-name">
        SOMA
      </a>
      <div className={`navbar-collapse ${isNavOpen ? "show" : ""}`}>

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