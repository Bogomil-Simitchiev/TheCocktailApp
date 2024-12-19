import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../App';

describe('App Component TESTS', () => {
  it('renders without crashing and showing correct test', () => {
    render(<App />);

    expect(screen.getByText(/Connect Your MetaMask Wallet to Access the App/i)).toBeInTheDocument();
  });
  it('checks if there is image of MetaMask', () => {
    render(<App />);

    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
  });
});