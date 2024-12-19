import './FavouriteCocktail.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faFilledStar } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import FavouriteCocktailsContext from '../../../contexts/FavouriteCocktailsContext';
import { playCocktailSound } from '../../../hooks/usePlayCocktailSound';

const FavouriteCocktail = (props) => {
    const [playSound] = playCocktailSound();
    const { setFavCocktails } = useContext(FavouriteCocktailsContext);

    const handleRemoveFavCocktail = () => {
        setFavCocktails(prev => prev.filter(cocktail => cocktail.idDrink !== props.favouriteCocktail.idDrink));
    }

    return (
        <div className="favourite-cocktail-card">
            <img
                className="favourite-cocktail-card-image"
                onClick={playSound}
                src={props.image}
                alt={"Just a photo"}
            />
            <div className="favourite-cocktail-info">
                <h3>{props.name}</h3>
                <p>{props.description}</p>
            </div>
            <FontAwesomeIcon
                className="favourite-star-icon"
                icon={faFilledStar}
                onClick={handleRemoveFavCocktail}
            />
        </div>
    );
};

export default FavouriteCocktail;