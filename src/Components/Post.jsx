import { useState } from "react";
import { users } from "../assets/users";
import { FaTimes } from "react-icons/fa";
import { useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Post({
  messageId,
  id,
  message,
  time,
  hashtags,
  onDelete,
}) {
  if (!id) return <div />;
  const { userId } = useOutletContext();
  const user = users.find((user) => user.id === id);
  const name = user ? user.fullname : "Unknown User";
  const canDelete = parseInt(userId) === id;
  const formattedTime = new Date(time).toLocaleTimeString("en-US", {
    hour12: false,
  });
  const formattedDate = new Date(time)
    .toLocaleDateString("en-US")
    .replace(/\//g, ".");
  const formattedDateTime = `${formattedTime}, ${formattedDate}`;

  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const handleLikeClick = () => {
    if (disliked) {
      setDislikes(dislikes - 1);
      setDisliked(false);
    }

    if (liked) {
      setLikes(likes - 1);
      setLiked(false);
    } else {
      setLikes(likes + 1);
      setLiked(true);
    }
  };

  const handleDislikeClick = () => {
    if (liked) {
      setLikes(likes - 1);
      setLiked(false);
    }

    if (disliked) {
      setDislikes(dislikes - 1);
      setDisliked(false);
    } else {
      setDislikes(dislikes + 1);
      setDisliked(true);
    }
  };

  const handleDeleteClick = () => {
    onDelete(messageId);
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    setComments([
      ...comments,
      {
        user: users.find((user) => user.id === parseInt(userId)),
        text: newComment,
        time: Date.now(),
      },
    ]);
    setNewComment("");
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
          <p className="hashTags">
            {hashtags.map((tag, index) => (
              <span key={index}>#{tag.trim()} </span>
            ))}
          </p>
        ) : (
          <p className="hashTags">No hashtags</p>
        )}

        <div className="post-actions">
          <p>{formattedDateTime} </p>
          <button onClick={handleLikeClick}>
            <span>Like</span>
            <span>{likes}</span>
          </button>
          <button onClick={handleDislikeClick}>
            <span>Dislike</span>
            <span>{dislikes}</span>
          </button>
        </div>
        <div className="post-comments">
          <h3>Comments</h3>
          {comments.length === 0 && <p>No comments yet</p>}
          {comments.map((comment, index) => (
            <Comment
              key={index}
              user={comment.user}
              time={comment.time}
              text={comment.text}
            />
          ))}
          <form onSubmit={handleCommentSubmit}>
            <input
              type="text"
              value={newComment}
              onChange={(event) => setNewComment(event.target.value)}
              placeholder="Add a comment..."
            />
            <button type="submit" disabled={!newComment}>
              Comment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function Comment({ user, time, text }) {
  const formattedTime = new Date(time).toLocaleTimeString("en-US", {
    hour12: false,
  });
  const formattedDate = new Date(time)
    .toLocaleDateString("en-US")
    .replace(/\//g, ".");
  const formattedDateTime = `${formattedTime}, ${formattedDate}`;

  return (
    <div className="comment">
      <Link to={`/user/${user.id}`}>
        <img src={user.avatar} alt="Profile picture" className="avatar" />
      </Link>
      <div className="comment-content">
        <p>
          <Link to={`/user/${user.id}`}>{user.fullname}</Link>
          {" - "}
          {formattedDateTime}
        </p>
        <p>{text}</p>
      </div>
    </div>
  );
}
