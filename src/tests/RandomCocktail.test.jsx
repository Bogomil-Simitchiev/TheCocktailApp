import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import RandomCocktail from '../components/RandomCocktail/RandomCocktail.jsx';
import { getRandomCocktail } from '../services/cocktailService';
import { playCocktailSound } from '../hooks/usePlayCocktailSound';

vi.mock('../services/cocktailService');
vi.mock('../hooks/usePlayCocktailSound');

describe('RandomCocktail Component', () => {
    const mockRandomCocktail = {
        strDrink: 'Mojito',
        strDrinkThumb: 'mojito.jpg',
        strCategory: 'Cocktail',
        strAlcoholic: 'Alcoholic',
        strInstructions: 'Mix ingredients and serve over ice.',
        strIngredient1: 'Rum',
        strIngredient2: 'Mint',
        strIngredient3: 'Sugar',
        strMeasure1: '50ml',
        strMeasure2: '10 leaves',
        strMeasure3: '1 tsp',
    };

    const mockPlaySound = vi.fn();
    playCocktailSound.mockReturnValue([mockPlaySound]);

    it('renders random cocktail without crashing', async () => {
        getRandomCocktail.mockResolvedValueOnce({
            drinks: [mockRandomCocktail],
        });

        render(<RandomCocktail />);
        const button = screen.getByText(/Click to get random cocktail/i);
        fireEvent.click(button);

        await waitFor(() => {
            expect(screen.getByText('Mojito')).toBeInTheDocument();
            expect(screen.getByText('Cocktail')).toBeInTheDocument();

        });
    });

    it('plays sound when the cocktail image is clicked', async () => {
        getRandomCocktail.mockResolvedValueOnce({
            drinks: [mockRandomCocktail],
        });

        render(<RandomCocktail />);

        const button = screen.getByText(/Click to get random cocktail/i);
        fireEvent.click(button);

        await waitFor(() => {
            const image = screen.getByAltText('Mojito');
            expect(image).toBeInTheDocument();

            fireEvent.click(image);
            expect(mockPlaySound).toHaveBeenCalledTimes(1);
        });
    });
});