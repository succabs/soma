import React, { useState } from "react";
import Post from "../Components/Post";

export default function Posts({ userId }) {
  const [messages, setMessages] = useState(() => {
    const storedMessages = localStorage.getItem("messages");
    let parsedMessages = storedMessages ? JSON.parse(storedMessages) : [];
    if (userId) {
      // Filter messages based on the user id if it's passed
      parsedMessages = parsedMessages.filter(
        (message) => message.id === parseInt(userId)
      );
    }
    return parsedMessages;
  });

  if (messages.length > 0) {
    messages.reverse();
  }
  const handleDelete = (messageId) => {
    const updatedMessages = messages.filter(
      (message) => message.messageId !== messageId
    );
    localStorage.setItem("messages", JSON.stringify(updatedMessages));
    setMessages(updatedMessages);
  };

  return (
    <div className="posts">
      {messages.map((data, key) => {
        return (
          <div key={key}>
            <Post
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
  );
}
