import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    const storedMessages = localStorage.getItem("messages");
    let parsedMessages = storedMessages ? JSON.parse(storedMessages) : [];
    if (userId) {
      // Filter messages based on the user id if it's passed
      parsedMessages = parsedMessages.filter(
        (message) => message.id === parseInt(userId)
      );
    }
    setMessages(parsedMessages);
  }, [userId]);

  if (messages.length > 0) {
    messages.reverse();
  }

  const handleDelete = (messageId) => {
    const updatedMessages = messages.filter(
      (message) => message.messageId !== messageId
    );
    setMessages(updatedMessages);

    // Get all messages from localStorage
    const storedMessages = localStorage.getItem("messages");
    const allMessages = storedMessages ? JSON.parse(storedMessages) : [];

    // Remove the specific message with the given messageId
    const updatedAllMessages = allMessages.filter(
      (message) => message.messageId !== messageId
    );

    // Update localStorage with the updatedAllMessages array
    localStorage.setItem("messages", JSON.stringify(updatedAllMessages));
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
