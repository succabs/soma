import { useState } from 'react';
import { users } from "../assets/users";

export default function User() {
  const [user, setUser] = useState(null);
  
  const selectRandomUser = () => {
    const randomIndex = Math.floor(Math.random() * users.length);
    setUser(users[randomIndex]);
  }

  if (!user) {
    selectRandomUser();
    return <div>Loading...</div>
  }

  return (
    <div className="userPage">
      <div className='userMainArea'>
      <div className="userGreetings">
        <img src={user.avatar} alt="Profile picture" />
        <h1>{user.fullname}</h1>
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
      </div>
      <div className='post'>
        <p>This user has not posted anything yet.</p>
      </div>
      </div>
    </div>
  );
};
