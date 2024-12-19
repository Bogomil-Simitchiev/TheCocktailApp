import { Route, Routes } from "react-router-dom";
import { AllCocktailsProvider } from "../../../contexts/AllCocktailsContext";
import { FavouriteCocktailsProvider } from "../../../contexts/FavouriteCocktailsContext";
import { LoadingProvider } from "../../../contexts/LoadingContext";
import CocktailsList from "../../CocktailsList/CocktailsList";
import FavouriteCocktailsList from "../../FavouriteCocktailsList/FavouriteCocktailsList";
import RandomCocktail from "../../RandomCocktail/RandomCocktail";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import BlockchainComponent from "../../BlockchainComponent/BlockchainComponent";
import AddCocktail from "../../AddCocktail/AddCocktail";
import RateCocktail from "../../RateCocktail/RateCocktail";

const AppContent = () => {
    return (
        <div className="app">
            <FavouriteCocktailsProvider>
                <LoadingProvider>
                    <AllCocktailsProvider>
                        <Header />
                        <Routes>
                            <Route path='/' element={<CocktailsList />} />
                            <Route path='/random-cocktail' element={<RandomCocktail />} />
                            <Route path='/favourites' element={<FavouriteCocktailsList />} />
                            <Route path='/blockchain' element={<BlockchainComponent />} />
                            <Route path='/add-cocktail' element={<AddCocktail />} />
                            <Route path='/rate-cocktail' element={<RateCocktail />} />
                        </Routes>
                        <Footer />
                    </AllCocktailsProvider>
                </LoadingProvider>
            </FavouriteCocktailsProvider>
        </div>
    );
};

export default AppContent;