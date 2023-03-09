import { Link } from "react-router-dom";
import "../index.css";
import { users } from "../assets/users";
import SearchBar from "./SearchBar";

export default function Navbar(props) {
  const handleSignIn = (event) => {
    event.preventDefault();
    const userId = document.getElementById("userIdInput").value;
    if (isNaN(userId) || userId < 1 || userId > 1000) {
      alert("Invalid username");
      return;
    }
    props.signin(userId);
    handleClick();
  };
  const userId = props.userId;
  const userData = users.find((user) => user.id === parseInt(userId));

  return (
    <nav className="navigation">
      <h1 className="brand-name">
        <Link to={`/`}>ReadPostShare</Link>
      </h1>
      <div>
        {props.isSignedIn ? (
          <div>
            <SearchBar />
            <div className="navUserInfo">
              <img src={userData.avatar} alt="Profile picture" />
              <p className="navName">{props.userId}</p>
              <p>
                (<Link to={`/user/${userId}`}>view profile</Link>)
              </p>
              <p>
                (
                <a
                  href="#"
                  onClick={() => {
                    props.signout();
                    handleClick();
                  }}
                >
                  log out
                </a>
                )
              </p>
            </div>
            <div className="navNotificationInfo">
              <p>Notifications</p>
            </div>

            <ul>
              <li>
                <Link to={`/home`}>Home</Link>
              </li>
              <li>
                <Link to={`/newpost`}>New post</Link>
              </li>
              <li>
                <Link to={`/home`}>Messages</Link>
              </li>
            </ul>
          </div>
        ) : (
          <div>
            <form onSubmit={handleSignIn}>
              <label>
                <p>User ID</p>
                <input id="userIdInput" name="userId" type="text" />
              </label>
              <p>
                <button className="buttonLog" type="submit">
                  Log in
                </button>
              </p>
            </form>
          </div>
        )}
      </div>
    </nav>
  );
}
function handleClick() {
  document.body.classList.add("darken-background");
  setTimeout(() => {
    document.body.classList.remove("darken-background");
  }, 200); /* Remove the class after 200ms to make the transition back to normal fast */
}
