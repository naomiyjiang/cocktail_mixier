import React, { useState } from "react";
import SearchForm from "./SearchForm";
import CocktailList from "./CocktailList";
import './App.css';

export default function App() {
  const [ingredient1, setIngredient1] = useState('');
  const [ingredient2, setIngredient2] = useState('');
  const [cocktails, setCocktails] = useState([]);  
  const [showResults, setShowResults] = useState(false); 
  const [idDrink, setIdDrink] = useState('');
  const [searchInitiated, setSearchInitiated] = useState(false); // Track search initiation

  const fetchCocktails = async () => {
    try {
      if (ingredient1 && ingredient2) {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=${ingredient1},${ingredient2}`);
        if (response.ok) {
          const result = await response.json();
          console.log("Fetched data:", result);
          setCocktails(result.drinks || []);
        } else {
          console.error('Failed to fetch:', response.status);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleInputChange = (inputNumber, value) => {
    if (inputNumber === 1) {
      setIngredient1(value);
    } else if (inputNumber === 2) {
      setIngredient2(value);
    }
  };
  
  const handleSearch = () => {
    if (ingredient1 && ingredient2) {
      fetchCocktails();
      setShowResults(true);
      setSearchInitiated(true); // Set search initiated
    }
  };

  const getRandomCocktail = async () => {
    try {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v2/9973533/random.php');
      if (response.ok) {
        const result = await response.json();
        console.log("Random cocktail data:", result);
        const randomCocktail = result.drinks && result.drinks[0];
        if (randomCocktail) {
          const { idDrink, strDrinkThumb } = randomCocktail;
          setIdDrink(idDrink);
          setCocktails([{ idDrink, strDrinkThumb }]);
          setShowResults(true);
          setSearchInitiated(false); // Reset search initiated upon random selection
        } else {
          console.error('No random cocktail found.');
        }
      } else {
        console.error('Failed to fetch random cocktail:', response.status);
      }
    } catch (error) {
      console.error('Error fetching random cocktail:', error);
    }
  };

  return (
    <div className="App">
      <SearchForm
        ingredient1={ingredient1}
        ingredient2={ingredient2}
        handleInputChange={handleInputChange}
        handleSearch={handleSearch}
        handleRandom={getRandomCocktail} 
      />
      {showResults ? (
        <div style={{ textAlign: "center" }}> 
          {searchInitiated ? (
            <>
              <h3>AS YOU REQUESTED</h3>
              <h3>WE MIXED "{ingredient1.toUpperCase()}" AND "{ingredient2.toUpperCase()}"</h3>
              <h3>HERE IS YOUR COCKTAIL LIST</h3>
            </>
          ) : (
            <h3>Here you go!</h3>
          )}
          <CocktailList cocktails={cocktails} />
        </div>
      ) : null}
    </div>
  );
}
