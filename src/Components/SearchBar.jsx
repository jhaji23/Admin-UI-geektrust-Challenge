import React from "react";

function SearchBar({ inputText }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by name , email or role"
        className="input input-bordered input-success w-full max-w-xs"
        onChange={inputText}
      />
    </div>
  );
}

export default SearchBar;
