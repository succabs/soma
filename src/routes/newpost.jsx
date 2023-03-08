import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { messages } from "../assets/messages";

function NewPost() {
  const { currentUser } = useOutletContext();
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    message: '',
    location: '',
  });

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      messageId: messages.length + 1, 
      id: currentUser,
      message: formState.message,
      location: formState.location,
      time: new Date().toLocaleString('en-US', { hour12: false }),
    };
    messages.push(message);
    await saveMessages();
    setFormState({
      message: '',
      location: '',
    });
    navigate('/');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Message:
          <textarea name="message" value={formState.message} onChange={handleChange} />
        </label>
        <br />
        <label>
          Location:
          <input type="text" name="location" value={formState.location} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Post</button>
      </form>
    </div>
  );
}

const saveMessages = () => {
    try {
      localStorage.setItem('messages', JSON.stringify(messages));
      console.log('Messages saved to localStorage');
    } catch (err) {
      console.log('Error saving messages to localStorage', err);
    }
  };
  // Get items from localStorage
const storedMessages = localStorage.getItem('messages');

// Parse the JSON string back to an object
const messages1 = JSON.parse(storedMessages);

// Log the messages to the console
console.log(messages1);

export default NewPost;
