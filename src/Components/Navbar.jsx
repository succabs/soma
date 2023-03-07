import {Link } from "react-router-dom";
import "../index.css"

export default function Navbar(props) {
  const handleSignIn = (event) => {
    event.preventDefault();
    const userId = document.getElementById("userIdInput").value;
    props.signin(userId);
    handleClick();
  }
    return (
      <nav  className="navigation">
              <a href="/" className="brand-name">
        SOMA
      </a>
      <div>

        <div>
          <p>Notifications</p>
        </div>

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
              <li>
              <Link to={`/home`}>Messages</Link>
              </li>
          </ul>
          
          {props.isSignedIn ? (
            <div>
            <p>You are logged in as user {props.userId}</p>
            <button className="buttonLog" onClick={() => {props.signout(); handleClick();}}>Log Out</button>
            </div>
          ) : (
            <div>
<form onSubmit= {handleSignIn}>
  <label>
    <p>User ID</p> 
    <input
    id="userIdInput"
      name="userId"
      type="text"
    />
  </label>
  <p><button className="buttonLog" type="submit">Log in</button></p>
</form>
          </div>
          )}
            </div>
          
      </nav>
      )
      
  }
  function handleClick() {
    document.body.classList.add('darken-background');
    setTimeout(() => {
      document.body.classList.remove('darken-background');
    }, 200); /* Remove the class after 200ms to make the transition back to normal fast */
  }

  