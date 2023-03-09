import { users } from "../assets/users";
import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Home() {
  const [messages, setMessages] = useState(() => {
    const storedMessages = localStorage.getItem("messages");
    console.log(storedMessages);
    return storedMessages ? JSON.parse(storedMessages) : [];
  });

  const handleDelete = (messageId) => {
    const updatedMessages = messages.filter(
      (message) => message.messageId !== messageId
    );
    localStorage.setItem("messages", JSON.stringify(updatedMessages));
    setMessages(updatedMessages);
  };

  if (messages.length > 0) {
    messages.reverse();
  }

  return (
    <div className="home">
      <div className="posts">
        {messages.map((data, key) => {
          return (
            <div key={key}>
              <Message
                messageId={data.messageId}
                id={data.id}
                message={data.message}
                time={data.time}
                hashtags={data.hashtags}
                onDelete={handleDelete}
              />
            </div>
          );
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
      <Link to={`/user/${user.id}`}>
        {" "}
        <img src={user.avatar} alt="Profile picture" />
      </Link>

      <div className="post-content">
        <h5>
          {" "}
          <Link to={`/user/${user.id}`}>{name}</Link> says:
        </h5>
        <p>{message}</p>
        {hashtags && hashtags.length > 0 ? (
          <p>
            {hashtags.map((tag, index) => (
              <span key={index}>#{tag.trim()} </span>
            ))}
          </p>
        ) : (
          <p></p>
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
