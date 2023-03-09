import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function NewPost() {
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();
  const { userId } = useOutletContext();
  const [formState, setFormState] = useState({
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  function removeTag(index) {
    setTags(tags.filter((el, i) => i !== index));
  }

  function handleKeyDown(e) {
    // If user did not press enter key, return
    if (e.keyCode !== 32) return;
    // Get the value of the input
    const value = e.target.value;
    // If the value is empty, return
    if (!value.trim()) return;
    // Add the value to the tags array
    setTags([...tags, value]);
    // Clear the input
    e.target.value = "";
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to post this?")) return;
    const messages = JSON.parse(localStorage.getItem("messages")) || [];
    const message = {
      messageId:
        messages.length > 0 ? messages[messages.length - 1].messageId + 1 : 1,
      id: parseInt(userId),
      message: formState.message,
      hashtags: tags,
      time: new Date().toLocaleString("en-US", { hour12: false }),
    };
    console.log(message);
    messages.push(message);
    localStorage.setItem("messages", JSON.stringify(messages));
    setFormState({
      message: "",
      hashtags: [],
    });
    navigate("/home");
  };

  return (
    <div className="newPost">
      <form onSubmit={handleSubmit}>
        <label>
          New post:
          <textarea
            className="newPostMessageArea"
            placeholder="What do you want to say to the world?"
            name="message"
            value={formState.message}
            onChange={handleChange}
          />
        </label>
        <br />
        <div className="tags-input-container">
          {tags.map((tag, index) => (
            <div className="tag-item" key={index}>
              <span className="text">{tag}</span>
              <span className="close" onClick={() => removeTag(index)}>
                &times;
              </span>
            </div>
          ))}
          <input
            onKeyDown={handleKeyDown}
            type="text"
            className="tags-input"
            placeholder="Type keywords, separate them with space"
          />
        </div>
        <br />
        <button className="buttonLog" type="submit">
          Post
        </button>
      </form>
    </div>
  );
}

export default NewPost;
