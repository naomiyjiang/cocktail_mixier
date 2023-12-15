import React from "react";

export default function SearchForm({
  ingredient1,
  ingredient2,
  handleInputChange,
  handleSearch,
  handleRandom // Add the handleRandom function
}) {
  return (
    <div className="container">
      <h1>Cocktail Mixer</h1>
      <div className="inputField">
        <input
          type="text"
          placeholder="Enter ingredient 1"
          value={ingredient1}
          onChange={(e) => handleInputChange(1, e.target.value)}
        />
      </div>
      <div className="inputField">
        <input
          type="text"
          placeholder="Enter ingredient 2"
          value={ingredient2}
          onChange={(e) => handleInputChange(2, e.target.value)}
        />
      </div>
      <div className="buttonGroup">
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleRandom}>Random</button>
      </div>
    </div>
  );
}
