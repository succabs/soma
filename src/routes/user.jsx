import { users } from "../assets/users";
import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

export default function User() {
  const [messages, setMessages] = useState(() => {
    const storedMessages = localStorage.getItem("messages");
    return storedMessages ? JSON.parse(storedMessages) : [];
  });

  const handleDelete = (messageId) => {
    const updatedMessages = messages.filter(
      (message) => message.messageId !== messageId
    );
    localStorage.setItem("messages", JSON.stringify(updatedMessages));
    setMessages(updatedMessages);
  };

  const { userId } = useOutletContext();
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
        {messages.map((message) => {
          if (message.id === parseInt(userId)) {
            return (
              <div className="post" key={message.messageId}>
                <Message
                  messageId={message.messageId}
                  id={message.id}
                  message={message.message}
                  time={message.time}
                  hashtags={message.hashtags}
                  onDelete={handleDelete}
                />
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
}

const Message = ({ messageId, id, message, time, hashtags, onDelete }) => {
  if (!id) return <div />;
  const { userId } = useOutletContext();
  const user = users.find((user) => user.id === id);
  const name = user ? user.fullname : "Unknown User";
  const canDelete = parseInt(userId) === id;
  const handleDeleteClick = () => {
    onDelete(messageId);
  };

  return (
    <div className="post">
      {canDelete && (
        <button onClick={handleDeleteClick} className="delete">
          <FaTimes />
        </button>
      )}
      <img src={user.avatar} alt="Profile picture" />
      <div className="post-content">
        <h5>{name} says:</h5>
        <p>{message}</p>
        {hashtags && hashtags.length > 0 ? (
          <p>
            {hashtags.map((tag, index) => (
              <span key={index}>#{tag.trim()} </span>
            ))}
          </p>
        ) : (
          <p>No hashtags</p>
        )}

        <div className="post-actions">
          <p>{time} </p>
          <button>
            <span>Like</span>
            <span>0</span>
          </button>
          <button>
            <span>Dislike</span>
            <span>0</span>
          </button>
          <button>
            <span>Comments</span>
            <span>0</span>
          </button>
        </div>
      </div>
    </div>
  );
};
