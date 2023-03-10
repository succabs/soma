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
  const formattedTime = new Date(time).toLocaleTimeString("en-US", { hour12: false });
  const formattedDate = new Date(time).toLocaleDateString("en-US").replace(/\//g, ".");
  const formattedDateTime = `${formattedTime}, ${formattedDate}`;



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
