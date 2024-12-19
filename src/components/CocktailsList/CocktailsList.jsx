import { useRef, useEffect, useState, useContext } from 'react';
import CocktailCard from './CocktailCard/CocktailCard';
import './CocktailsList.css';
import { getAllCocktails, searchCocktail } from '../../services/cocktailService';
import LoadingContext from '../../contexts/LoadingContext';
import AllCocktailsContext from '../../contexts/AllCocktailsContext';
import { useNavigate } from 'react-router-dom';

const CocktailsList = () => {
    const navigate = useNavigate();
    const [cocktails, setCocktails] = useState([]);
    const [categories] = useState(["Cocktail", "Shot", "Ordinary Drink", "Punch / Party Drink", "Coffee / Tea"]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const { allCocktails } = useContext(AllCocktailsContext);
    const { isLoading, startLoading, stopLoading } = useContext(LoadingContext);
    const searchInputRef = useRef('');

    useEffect(() => {
        startLoading();
        getAllCocktails()
            .then(data => {
                setCocktails(data.drinks);
                stopLoading();
            })
            .catch(err => console.log(err));
    }, []);

    const handleSearchCocktail = () => {
        const searchTerm = searchInputRef.current.value;
        if (!searchTerm.trim()) return;

        startLoading();
        searchCocktail(searchTerm)
            .then(data => {
                if (data.drinks == null) {
                    setCocktails([]);
                } else {
                    setCocktails(data.drinks);
                }
                searchInputRef.current.value = '';
                setSelectedCategory('');
                stopLoading();
            })
            .catch(err => console.log(err));
    };

    const handleFilterByCategory = (category) => {
        setSelectedCategory(category);

        if (category === '') {
            setCocktails(allCocktails);
        } else {
            const filteredCocktails = allCocktails.filter(cocktail => cocktail.strCategory === category);
            setCocktails(filteredCocktails);
        }
    };

    return (
        <>
            <div className="search-bar">
                <input ref={searchInputRef} type="text" placeholder="Search for cocktail...." />
                <button onClick={handleSearchCocktail}>Search</button>
                <button onClick={() => { navigate('/blockchain') }} className='blockchain-btn'>Go to Blockchain operations</button>
            </div>

            <div className="category-filter">
                <select
                    value={selectedCategory}
                    onChange={(e) => handleFilterByCategory(e.target.value)}
                >
                    <option value="">All Categories</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            <div className="cocktail-grid">
                {isLoading ? (
                    <h1>Loading....</h1>
                ) : cocktails.length === 0 ? (
                    <h1>No cocktails found....</h1>
                ) : (
                    cocktails.map((cocktail, index) => (
                        <CocktailCard
                            key={index}
                            name={cocktail.strDrink}
                            description={cocktail.strInstructions.toString()}
                            image={cocktail.strDrinkThumb}
                            cocktail={cocktail}
                        />
                    ))
                )}
            </div>
        </>
    );
};

export default CocktailsList;