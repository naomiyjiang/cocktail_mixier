import React, { useState, useEffect } from "react";

const CocktailList = ({ cocktails, showResults }) => {
  if (!showResults) {
    return <h1 style={{ color: '#FFFFFF' }}>Just kidding. Nothing is ready for you. Try something else!</h1>;
  }

  return (
    <ul className="image-container">
      {cocktails.map(cocktail => (
        <li key={cocktail.idDrink}>
          <img
            src={cocktail.strDrinkThumb}
            alt={cocktail.strDrink}
            style={{ width: '100px', height: '100px' }}
          />
          <p style={{ color: '#FFFFFF' }}>{cocktail.strDrink}</p>
        </li>
      ))}
    </ul>
  );
}

const SearchForm = ({ ingredient1, ingredient2, handleInputChange, handleSearch, handleRandom }) => {
  return (
    <div className="inputField" style={{ backgroundColor: '#240046' }}>
      <input
        type="text"
        placeholder="Enter ingredient 1"
        value={ingredient1}
        onChange={(e) => handleInputChange(1, e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter ingredient 2"
        value={ingredient2}
        onChange={(e) => handleInputChange(2, e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <button onClick={handleRandom}>Random Recipe</button>
    </div>
  );
}

const App = () => {
  const [ingredient1, setIngredient1] = useState('');
  const [ingredient2, setIngredient2] = useState('');
  const [cocktails, setCocktails] = useState([]);  
  const [showResults, setShowResults] = useState(false); 

  const fetchCocktails = async (url) => {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const result = await response.json();
        console.log("Fetched data:", result);
        setCocktails(result.drinks || []);
        setShowResults(true);
      } else {
        console.error('Failed to fetch:', response.status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleInputChange = (inputNumber, value) => {
    // Handle input changes
  };

  const handleSearch = () => {
    // Handle search functionality based on ingredients
  };

  const handleRandom = () => {
    const randomURL = 'https://www.thecocktaildb.com/api/json/v2/9973533/random.php';
    fetchCocktails(randomURL);
  };

  return (
    <div className="App">
      <SearchForm
        ingredient1={ingredient1}
        ingredient2={ingredient2}
        handleInputChange={handleInputChange}
        handleSearch={handleSearch}
        handleRandom={handleRandom}
      />
      <CocktailList cocktails={cocktails} showResults={showResults} />
    </div>
  );
}

export default App;
