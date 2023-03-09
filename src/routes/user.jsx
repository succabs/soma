import { users } from "../assets/users";
import { useOutletContext } from "react-router-dom";

export default function User() {
  const outletContext = useOutletContext();
  console.log(outletContext);

  const { userId } = useOutletContext();
  console.log(userId);
  const userData = users.find((user) => user.id === parseInt(userId));

  if (!userData) {
    return <div>User not found</div>;
  }

  return (
    <div className="userPage">
      <div className="userMainArea">
        <div className="userGreetings">
          <img src={userData.avatar} alt="Profile picture" />
          <h1>{userData.fullname}</h1>
          <p>Username: {userData.username}</p>
          <p>Email: {userData.email}</p>
        </div>
        <div className="post">
          <p>You have not posted anything yet.</p>
        </div>
      </div>
    </div>
  );
}
