import { useState } from 'react';
import './RandomCocktail.css';
import { getRandomCocktail } from '../../services/cocktailService';
import { playCocktailSound } from '../../hooks/usePlayCocktailSound';

const RandomCocktail = () => {
    const [playSound] = playCocktailSound();
    const [randomCocktail, setCocktail] = useState(null);
    const handleRandomCocktail = async () => {
        getRandomCocktail().then(data => {
            setCocktail(data.drinks[0]);
        }).catch(err => console.log(err))
    };

    return (
        <div className="random-cocktail-container">
            <div>
                <h1>Get Random Cocktail</h1>

                <button className="get-random-button" onClick={handleRandomCocktail}>
                    Click to get random cocktail
                </button>
            </div>

            {randomCocktail && (
                <div className="random-cocktail-card">
                    <h2>{randomCocktail.strDrink}</h2>
                    <img onClick={playSound} src={randomCocktail.strDrinkThumb} alt={randomCocktail.strDrink} className="random-cocktail-image" />
                    <p><strong>Category:</strong> {randomCocktail.strCategory}</p>
                    <p><strong>Alcoholic:</strong> {randomCocktail.strAlcoholic}</p>
                    <p><strong>Instructions:</strong> {randomCocktail.strInstructions}</p>
                    <ul>
                        <strong>Ingredients:</strong>
                        {Object.keys(randomCocktail)
                            .filter(key => key.startsWith('strIngredient') && randomCocktail[key])
                            .map((key, index) => (
                                <li key={index}>
                                    {randomCocktail[key]} {randomCocktail[`strMeasure${index + 1}`] && `- ${randomCocktail[`strMeasure${index + 1}`]}`}
                                </li>
                            ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default RandomCocktail;