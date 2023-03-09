import React, { useState, useEffect } from "react";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Search for messages in local storage
    const messages = JSON.parse(localStorage.getItem("messages")) || [];
    const filteredMessages = messages.filter(
      (message) =>
        message.message.includes(value) ||
        message.hashtags.some((tag) => tag.includes(value))
    );
    setResults(filteredMessages);
  };

  useEffect(() => {
    // Listen for changes to localStorage
    const handleStorageChange = (e) => {
      if (e.key === "messages") {
        // Rerun the search and update the results
        const messages = JSON.parse(e.newValue) || [];
        const filteredMessages = messages.filter(
          (message) =>
            message.message.includes(searchTerm) ||
            message.hashtags.some((tag) => tag.includes(searchTerm))
        );
        setResults(filteredMessages);
      }
    };
    window.addEventListener("storage", handleStorageChange);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [searchTerm]);

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
