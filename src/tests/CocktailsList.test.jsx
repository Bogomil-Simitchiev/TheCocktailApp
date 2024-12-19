import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import CocktailsList from '../components/CocktailsList/CocktailsList.jsx';
import LoadingContext from '../contexts/LoadingContext.jsx';
import AllCocktailsContext from '../contexts/AllCocktailsContext.jsx';
import FavouriteCocktailsContext from '../contexts/FavouriteCocktailsContext.jsx';
import { getAllCocktails } from '../services/cocktailService.jsx';

vi.mock('../services/cocktailService.jsx');

describe('CocktailsList Component TESTS', () => {
    const mockCocktails = [
        {
            strDrink: 'A1',
            strInstructions: 'Pour all ingredients into a cocktail shaker, mix, and serve over ice into a chilled glass.',
            strDrinkThumb: 'a1.jpg',
            strCategory: 'Cocktail',
        },
        {
            strDrink: 'Old Fashioned',
            strInstructions: 'Stir and serve.',
            strDrinkThumb: 'oldfashioned.jpg',
            strCategory: 'Ordinary Drink',
        },
    ];

    const mockLoadingContextValue = {
        isLoading: false,
        startLoading: vi.fn(),
        stopLoading: vi.fn(),
    };

    const mockAllCocktailsContextValue = {
        allCocktails: mockCocktails,
    };

    const mockFavouriteCocktailsContextValue = {
        favouriteCocktails: [],
        setFavCocktails: vi.fn(),
    };

    it('renders "No cocktails found" for an empty array', () => {
        getAllCocktails.mockResolvedValueOnce({ drinks: [] });
        render(
            <MemoryRouter>
                <LoadingContext.Provider value={mockLoadingContextValue}>
                    <AllCocktailsContext.Provider value={mockAllCocktailsContextValue}>
                        <FavouriteCocktailsContext.Provider value={mockFavouriteCocktailsContextValue}>
                            <CocktailsList />
                        </FavouriteCocktailsContext.Provider>
                    </AllCocktailsContext.Provider>
                </LoadingContext.Provider>
            </MemoryRouter>
        );

        expect(screen.getByText(/No cocktails found..../i)).toBeInTheDocument();
    });

    it('fetches and displays cocktails from the API', async () => {
        getAllCocktails.mockResolvedValueOnce({ drinks: mockCocktails });

        render(
            <MemoryRouter>
                <LoadingContext.Provider value={mockLoadingContextValue}>
                    <AllCocktailsContext.Provider value={mockAllCocktailsContextValue}>
                        <FavouriteCocktailsContext.Provider value={mockFavouriteCocktailsContextValue}>
                            <CocktailsList />
                        </FavouriteCocktailsContext.Provider>
                    </AllCocktailsContext.Provider>
                </LoadingContext.Provider>
            </MemoryRouter>
        );
       
        await waitFor(() => {
            expect(screen.getByText('A1')).toBeInTheDocument();
            expect(screen.getByText('Old Fashioned')).toBeInTheDocument();
        });
    });
});