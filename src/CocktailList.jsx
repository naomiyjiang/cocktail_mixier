import React, { useState, useEffect } from 'react';

const CocktailList = ({ cocktails }) => {
  const [cocktailDetails, setCocktailDetails] = useState([]);
  const [selectedCocktail, setSelectedCocktail] = useState(null);

  useEffect(() => {
    if (Array.isArray(cocktails)) {
      const fetchCocktailDetails = async () => {
        const details = await Promise.all(
          cocktails.map(async (cocktail) => {
            try {
              const response = await fetch(
                `https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=${cocktail.idDrink}`
              );
              if (response.ok) {
                const result = await response.json();
                return result.drinks && result.drinks[0];
              }
            } catch (error) {
              console.error('Error fetching cocktail details:', error);
            }
            return null;
          })
        );
        setCocktailDetails(details.filter((detail) => detail !== null));
      };

      fetchCocktailDetails();
    } else {
      setCocktailDetails([]); // Reset cocktail details if not an array
    }
  }, [cocktails]);

  const toggleIngredients = (idDrink) => {
    setSelectedCocktail(selectedCocktail === idDrink ? null : idDrink);
  };

  return (
    <div className="image-container" style={{ display: 'flex', flexWrap: 'wrap' }}>
      {cocktailDetails.map((cocktailDetail) => (
        <div key={cocktailDetail.idDrink} style={{ flex: '0 0 30%', margin: '10px 1.5%' }}>
          <img
            src={cocktailDetail.strDrinkThumb}
            alt={cocktailDetail.strDrink}
            style={{ width: 'auto', height: 'auto',maxHeight: '150px' }}
          />
          {(selectedCocktail === cocktailDetail.idDrink && (
            <div style={{ backgroundColor: '#240046', padding: '10px', color: 'white' }}>
              <h3>{cocktailDetail.strDrink}</h3>
              <p>{cocktailDetail.strInstructions}</p>
              <table style={{ color: 'white', width: '100%' }}>
                <tbody>
                  {Array.from({ length: 15 }, (_, index) => {
                    const ingredientKey = `strIngredient${index + 1}`;
                    const measureKey = `strMeasure${index + 1}`;
                    const ingredient = cocktailDetail[ingredientKey];
                    const measure = cocktailDetail[measureKey];

                    if (ingredient && ingredient.trim() !== '') {
                      return (
                        <tr key={ingredientKey}>
                          <td>{measure}</td>
                          <td>{ingredient}</td>
                        </tr>
                      );
                    }
                    return null;
                  })}
                </tbody>
              </table>
              <button onClick={() => toggleIngredients(null)}>Hide Ingredients</button>
            </div>
          )) || (
            <div style={{ backgroundColor: '#240046', padding: '10px', color: 'white' }}>
              <h3>{cocktailDetail.strDrink}</h3>
              <p>{cocktailDetail.strInstructions}</p>
              <button onClick={() => toggleIngredients(cocktailDetail.idDrink)}>
                Show Ingredients
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CocktailList;
