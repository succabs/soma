import React, { useState } from "react";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setSearchTerm(lowerCase);

    // Search for messages in local storage
    const messages = JSON.parse(localStorage.getItem("messages")) || [];
    const filteredMessages = messages.filter(
      (message) =>
        message.message.includes(value) ||
        message.hashtags.some((tag) => tag.includes(value))
    );
    setResults(filteredMessages);
  };

  return (
    <div className="search-container">
      <div className="search">
        <input
          type="text"
          className="searchTerm"
          placeholder="Search.."
          name="s"
          value={searchTerm}
          onChange={handleSearch}
        />
        <button type="submit" className="searchButton">
          <i className="fa fa-search"></i>
        </button>
      </div>
      {searchTerm && results.length > 0 && (
        <ul className="results-list">
          {results.map((result) => (
            <li key={result.messageId}>{result.message}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
