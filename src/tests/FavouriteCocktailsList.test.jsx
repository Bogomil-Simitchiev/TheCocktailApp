import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import FavouriteCocktailsList from '../components/FavouriteCocktailsList/FavouriteCocktailsList.jsx';
import FavouriteCocktailsContext from '../contexts/FavouriteCocktailsContext';

const mockFavouriteCocktails = [
    {
        strDrink: 'Mojito',
        strInstructions: 'Mix ingredients and serve over ice.',
        strDrinkThumb: 'mojito.jpg',
    },
    {
        strDrink: 'Margarita',
        strInstructions: 'Mix ingredients and serve chilled.',
        strDrinkThumb: 'margarita.jpg',
    },
];

describe('FavouriteCocktailsList Component', () => {
    it('renders message when no favourite cocktails are present', () => {
        const favouriteCocktailsContext = { favouriteCocktails: [] };

        render(
            <FavouriteCocktailsContext.Provider value={favouriteCocktailsContext}>
                <FavouriteCocktailsList />
            </FavouriteCocktailsContext.Provider>
        );

        expect(screen.getByText(/No favourite cocktails....$/i)).toBeInTheDocument();
    });

    it('renders a list of favourite cocktails', () => {
        const favouriteCocktailsContext = { favouriteCocktails: mockFavouriteCocktails };

        render(
            <FavouriteCocktailsContext.Provider value={favouriteCocktailsContext}>
                <FavouriteCocktailsList />
            </FavouriteCocktailsContext.Provider>
        );

        expect(screen.getByText('Mojito')).toBeInTheDocument();
        expect(screen.getByText('Margarita')).toBeInTheDocument();

    });
});