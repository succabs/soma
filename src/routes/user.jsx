import { users } from "../assets/users";
import { useParams } from "react-router-dom";
import Posts from "../Components/Posts";

export default function User() {
  const { userId } = useParams();
  const userData = users.find((user) => user.id === parseInt(userId));
  if (!userData) {
    return <div>User not found</div>;
  }

  return (
    <div className="userPage">
      <div className="userInfo">
        <img
          className="userAvatar"
          src={userData.avatar}
          alt="Profile picture"
        />
        <div className="userUpperInfo">
          <h1 className="userFullName">{userData.fullname}</h1>
          <p className="userName">@{userData.username}</p>
          <p>Email: {userData.email}</p>
        </div>
      </div>
      <Posts userId={userId} />
    </div>
  );
}
