import { createContext, useState, } from "react";

const FavouriteCocktailsContext = createContext();

export default FavouriteCocktailsContext;

export const FavouriteCocktailsProvider = ({ children }) => {
    const [favouriteCocktails, setFavCocktails] = useState([]);

    return (
        <FavouriteCocktailsContext.Provider value={{
            favouriteCocktails,
            setFavCocktails
        }}
        >
            {children}
        </FavouriteCocktailsContext.Provider>
    )

}