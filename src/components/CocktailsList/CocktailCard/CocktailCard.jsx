import './CocktailCard.css';
import { truncateText } from '../../../utils/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faEmptyStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as faFilledStar } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useState } from 'react';
import FavouriteCocktailsContext from '../../../contexts/FavouriteCocktailsContext';
import { playCocktailSound } from '../../../hooks/usePlayCocktailSound';

const CocktailCard = (props) => {
    const [playSound] = playCocktailSound();
    const { favouriteCocktails, setFavCocktails } = useContext(FavouriteCocktailsContext);
    const [isFavourite, setIsFavourite] = useState(false);

    useEffect(() => {
        const isInFavorites = favouriteCocktails.some(cocktail => cocktail.idDrink === props.cocktail.idDrink);
        setIsFavourite(isInFavorites);
    }, []);

    const handleAddToFavourites = () => {
        setFavCocktails(prev => [...prev, props.cocktail]);
        setIsFavourite(true);
    };

    const handleRemoveFromFavourites = () => {
        setFavCocktails(prev => prev.filter(cocktail => cocktail.idDrink !== props.cocktail.idDrink));
        setIsFavourite(false);
    };

    return (
        <div className="cocktail-card">
            <img
                className="cocktail-card-image"
                onClick={playSound}
                src={props.image}
                alt={"Just a photo"}
            />
            <div className="cocktail-info">
                <h3>{props.name}</h3>
                <p>{truncateText(props.description, 120)}</p>
            </div>
            <FontAwesomeIcon
                className="star-icon"
                onClick={isFavourite ? handleRemoveFromFavourites : handleAddToFavourites}
                icon={isFavourite ? faFilledStar : faEmptyStar}
            />
        </div>
    );
};

export default CocktailCard;