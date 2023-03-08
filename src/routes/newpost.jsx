import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { messages } from "../assets/messages";

function NewPost() {
  const navigate = useNavigate();
  const { userId } = useOutletContext();
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
      id: parseInt(userId),
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
    navigate('/home');
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
export default NewPost;
