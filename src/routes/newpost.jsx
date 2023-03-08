import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { messages } from "../assets/messages";

function NewPost() {
  const [tags, setTags] = useState([
    "HTML", "CSS", "JavaScript"
])
  const navigate = useNavigate();
  const { userId } = useOutletContext();
  const [formState, setFormState] = useState({
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
      setFormState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
  };

  function removeTag(index){
    setTags(tags.filter((el, i) => i !== index))
}

  function handleKeyDown(e){
    // If user did not press enter key, return
    if(e.key !== 'Enter') return
    // Get the value of the input
    const value = e.target.value
    // If the value is empty, return
    if(!value.trim()) return
    // Add the value to the tags array
    setTags([...tags, value])
    // Clear the input
    e.target.value = ''
}
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      messageId: messages.length + 1, 
      id: parseInt(userId),
      message: formState.message,
      hashtags: "",
      time: new Date().toLocaleString('en-US', { hour12: false }),
    };
    messages.push(message);
    await saveMessages();
    setFormState({
      message: '',
      hashtags: [],
    });
    navigate('/home');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Message:
          <textarea className="newPostMessageArea" name="message" value={formState.message} onChange={handleChange} />
        </label>
        <br />
        <br />
        <br />
        <button type="submit">Post</button>
      </form>
      <div className="tags-input-container">
            { tags.map((tag, index) => (
                <div className="tag-item" key={index}>
                    <span className="text">{tag}</span>
                    <span className="close" onClick={() => removeTag(index)}>&times;</span>
                </div>
            )) }
            <input onKeyDown={handleKeyDown} type="text" className="tags-input" placeholder="Type keywords" />
        </div>
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
