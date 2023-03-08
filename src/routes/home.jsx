import { messages } from "../assets/messages";
import { users } from "../assets/users";

export default function Home() {
    // Get items from localStorage
const storedMessages = localStorage.getItem('messages');

// Parse the JSON string back to an object
const messages1 = JSON.parse(storedMessages);

// Log the messages to the console
console.log(messages1);
    return (

      <div>
        {messages.map((data, key) => {
          return (
            <div key={key}>
              <Message
                key={key}
                id={data.id}
                message={data.message}
                time={data.time}
                location={data.location}
              />
            </div>
          );
        })}
      </div>
    );
  }

  const Message = ({ id, message, time, location }) => {
    if (!id) return <div />;
    const user = users.find(user => user.id === id);
    const name = user ? user.fullname : 'Unknown User';
    return (
      <div className="post">

              <h5>{name} says: </h5>
              <h5> {message}</h5>
              <h4> {time}</h4>
              <p> {location}</p>
      </div>
    );
  };
  