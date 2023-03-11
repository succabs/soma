import { FaTimes } from "react-icons/fa";
import { useOutletContext } from "react-router-dom";
import { users } from "../assets/users";
import React from "react";
import { Link } from "react-router-dom";

export default function Comment({ comment, onDelete }) {
  const { userId } = useOutletContext();
  const user = users.find((user) => user.id === comment.commenterId);
  const name = user ? user.fullname : "Unknown User";
  const isCommentOwner = parseInt(userId) === comment.commenterId;
  const formattedTime = new Date(comment.time).toLocaleTimeString("en-US", {
    hour12: false,
  });
  const formattedDate = new Date(comment.time)
    .toLocaleDateString("en-GB")
    .replace(/\//g, ".");
  const formattedDateTime = `${formattedTime}, ${formattedDate}`;

  const handleDeleteClick = () => {
    onDelete(comment.id);
  };

  return (
    <div className="comment">
      <Link to={`/user/${user.id}`}>
        <img src={user.avatar} alt="Profile picture" />
      </Link>
      <div className="comment-content">
        <h5>
          <Link to={`/user/${user.id}`}>{name}</Link>
        </h5>
        <p>{comment.text}</p>

        <div className="comment-footer">
          <div className="commentReactions">{formattedDateTime}</div>
          {isCommentOwner && (
            <button onClick={handleDeleteClick} className="delete">
              <FaTimes />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
