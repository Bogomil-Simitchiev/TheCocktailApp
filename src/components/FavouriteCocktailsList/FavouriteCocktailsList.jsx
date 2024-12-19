import { useContext } from 'react';
import './FavouriteCocktailsList.css';
import FavouriteCocktailsContext from '../../contexts/FavouriteCocktailsContext';
import FavouriteCocktail from './FavouriteCocktail/FavouriteCocktail';

const FavouriteCocktailsList = () => {
    const { favouriteCocktails } = useContext(FavouriteCocktailsContext);

    return (
        <>
            <div className="favourite-cocktail-grid">
                {favouriteCocktails.length == 0 ? <h1>No favourite cocktails....</h1> : favouriteCocktails.map((favouriteCocktail, index) => (
                    <FavouriteCocktail
                        key={index}
                        name={favouriteCocktail.strDrink}
                        description={favouriteCocktail.strInstructions.toString()}
                        image={favouriteCocktail.strDrinkThumb}
                        favouriteCocktail={favouriteCocktail}
                    />
                ))}
            </div>
        </>
    );
};

export default FavouriteCocktailsList;