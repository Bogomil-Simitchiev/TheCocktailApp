import { render, screen } from '@testing-library/react';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import BlockchainComponent from '../components/BlockchainComponent/BlockchainComponent';
import { config } from '../config/wagmiConfig';

const queryClient = new QueryClient();

describe('CocktailsList Component TESTS', () => {
    it('renders without crashing', () => {
        render(
            <MemoryRouter>
                <QueryClientProvider client={queryClient}>
                    <WagmiProvider config={config}>
                        <BlockchainComponent />
                    </WagmiProvider>
                </QueryClientProvider>
            </MemoryRouter>
        );

        expect(screen.getByText(/Blockchain Cocktail Operations/i)).toBeInTheDocument();
        expect(screen.getByText(/Add Cocktail/i)).toBeInTheDocument();
        expect(screen.getByText(/Rate Cocktail/i)).toBeInTheDocument();
    });

    it('shows cocktail count loading message', () => {
        render(
            <MemoryRouter>
                <QueryClientProvider client={queryClient}>
                    <WagmiProvider config={config}>
                        <BlockchainComponent />
                    </WagmiProvider>
                </QueryClientProvider>
            </MemoryRouter>
        );

        expect(screen.getByText(/Loading cocktail count....$/i)).toBeInTheDocument();
    });

});