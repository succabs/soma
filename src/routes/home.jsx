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
                location={data.location}
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

const Message = ({ id, message, time, location, hashtags }) => {
  if (!id) return <div />;
  const user = users.find((user) => user.id === id);
  const name = user ? user.fullname : "Unknown User";
  return (
    <div className="post">
      <img src={user.avatar} alt="Profile picture" />
      <h5>{name} says: </h5>
      <h5> {message}</h5>
      <p>
        {time} at {location}
      </p>
      <p>like or dislike</p>
      <p>0 comments</p>
      {hashtags && hashtags.length > 0 ? (
        <p>
          {hashtags.map((tag, index) => (
            <span key={index}>#{tag.trim()} </span>
          ))}
        </p>
      ) : (
        <p>No hashtags</p>
      )}
    </div>
  );
};
