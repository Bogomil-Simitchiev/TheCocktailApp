import { createContext, useContext, useEffect, useState, } from "react";
import { getAllCocktails } from "../services/cocktailService";

const AllCocktailsContext = createContext();

export default AllCocktailsContext;

export const AllCocktailsProvider = ({ children }) => {
    const [allCocktails, setAllCocktails] = useState([]);

    useEffect(() => {
        getAllCocktails()
            .then(data => {
                setAllCocktails(data.drinks);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <AllCocktailsContext.Provider value={{
            allCocktails,
            setAllCocktails
        }}
        >
            {children}
        </AllCocktailsContext.Provider>
    )

}