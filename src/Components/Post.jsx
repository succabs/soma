import { useState } from "react";
import { users } from "../assets/users";
import { FaTimes } from "react-icons/fa";
import { useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import Comment from "../Components/Comment";

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
    .toLocaleDateString("en-GB")
    .replace(/\//g, ".");
  const formattedDateTime = `${formattedTime}, ${formattedDate}`;

  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const storedComments = JSON.parse(
      localStorage.getItem(`comments-${messageId}`)
    );
    if (storedComments && storedComments.length) {
      setComments(storedComments);
    }

    const storedLikes = JSON.parse(localStorage.getItem(`likes-${messageId}`));
    if (storedLikes) {
      setLikes(storedLikes);
    }

    const storedDislikes = JSON.parse(
      localStorage.getItem(`dislikes-${messageId}`)
    );
    if (storedDislikes) {
      setDislikes(storedDislikes);
    }
  }, [messageId]);

  useEffect(() => {
    localStorage.setItem(`comments-${messageId}`, JSON.stringify(comments));
  }, [comments, messageId]);

  useEffect(() => {
    localStorage.setItem(`likes-${messageId}`, JSON.stringify(likes));
    console.log("message" + messageId + "likes" + likes);
  }, [likes, messageId]);

  useEffect(() => {
    localStorage.setItem(`dislikes-${messageId}`, JSON.stringify(dislikes));
  }, [dislikes, messageId]);

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
    if (newComment.trim() !== "") {
      const newCommentObj = {
        id: comments.length + 1,
        commenterId: parseInt(userId),
        time: new Date(),
        text: newComment.trim(),
      };
      setComments([...comments, newCommentObj]);
      setNewComment("");
    }
  };
  const handleCommentDelete = (commentId) => {
    const filteredComments = comments.filter(
      (comment) => comment.id !== commentId
    );
    setComments(filteredComments);
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
        {formattedDateTime}
        <div className="post-footer">
          <div className="reactions">
            <button
              className={`like-button ${liked ? "liked" : ""}`}
              onClick={handleLikeClick}
            >
              👍 {likes}
            </button>
            <button
              className={`dislike-button ${disliked ? "disliked" : ""}`}
              onClick={handleDislikeClick}
            >
              👎 {dislikes}
            </button>
          </div>
          <form onSubmit={handleCommentSubmit}>
            <input
              className="commentField"
              type="text"
              placeholder="Comment the post.."
              value={newComment}
              onChange={(event) => setNewComment(event.target.value)}
            />
            <button className="buttonLog" type="submit">
              Comment
            </button>
          </form>
        </div>
        <div className="comments">
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              onDelete={handleCommentDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
