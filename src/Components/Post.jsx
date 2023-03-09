import { users } from "../assets/users";
import { FaTimes } from "react-icons/fa";
import { useOutletContext } from "react-router-dom";

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
}
