import { users } from "../assets/users";
import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { useParams } from "react-router-dom";

export default function User() {
  const [messages, setMessages] = useState(() => {
    const storedMessages = localStorage.getItem("messages");
    return storedMessages ? JSON.parse(storedMessages) : [];
  });
  const { userId } = useParams();
  const userData = users.find((user) => user.id === parseInt(userId));

  const handleDelete = (messageId) => {
    const updatedMessages = messages.filter(
      (message) => message.messageId !== messageId
    );
    localStorage.setItem("messages", JSON.stringify(updatedMessages));
    setMessages(updatedMessages);
  };

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
      {messages.map((message) => {
        if (message.id === parseInt(userId)) {
          return (
            <div key={message.messageId}>
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
