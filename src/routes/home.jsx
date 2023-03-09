import { users } from "../assets/users";

export default function Home() {
  const storedMessages = localStorage.getItem("messages");
  const messages = storedMessages ? JSON.parse(storedMessages) : [];
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
                key={key}
                id={data.id}
                message={data.message}
                time={data.time}
                hashtags={data.hashtags}
              />
            </div>
          );
        })}
      </div>
      <div className="homeSide">
        <p>content</p>
      </div>
    </div>
  );
}

const Message = ({ id, message, time, hashtags }) => {
  if (!id) return <div />;
  const user = users.find((user) => user.id === id);
  const name = user ? user.fullname : "Unknown User";
  return (
    <div className="post">
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
