import { useState } from 'react';
import { useReadContract } from 'wagmi';
import { Link } from 'react-router-dom'
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../../utils/contract-info';
import './BlockchainComponent.css';
import { playCocktailSound } from '../../hooks/usePlayCocktailSound';

const BlockchainComponent = () => {
    const [playSound] = playCocktailSound();
    const [cocktailId, setCocktailId] = useState('');
    const [idToFetch, setIdToFetch] = useState('');

    const { data: cocktailCount, isError: countError, isLoading: countLoading } = useReadContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'getCockltailCount',
    });

    const { data: cocktail, isError: cocktailError, isLoading: cocktailLoading } = useReadContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'getCocktail',
        args: [idToFetch],
        enabled: idToFetch !== null,
    });

    const handleFetchCocktail = (e) => {
        e.preventDefault();
        if (!cocktailId || parseInt(cocktailId) < 0) {
            alert('Please enter a valid cocktail ID');
            return;
        }
        setIdToFetch(parseInt(cocktailId));
    };

    return (
        <div className="blockchain-container">
            <h1 className="title">Blockchain Cocktail Operations</h1>
            <Link to="/add-cocktail">Add Cocktail</Link>
            <Link to="/rate-cocktail">Rate Cocktail</Link>
            <div className="cocktail-count-container">
                <h2 className="section-title">Cocktails Count in Blockchain (starts from 0)</h2>
                {countLoading && <p className="loading">Loading cocktail count....</p>}
                {countError && <p className="error">Error fetching cocktail count</p>}
                {cocktailCount !== undefined && <p className="count">Total: {Number(cocktailCount.toString()) - 1} cocktails</p>}
            </div>

            <div className="fetch-cocktail-container">
                <h2 className="section-title">Get Cocktail by ID from the Blockchain</h2>
                <form onSubmit={handleFetchCocktail} className="form">
                    <input
                        type="number"
                        placeholder="Enter Cocktail ID"
                        value={cocktailId}
                        onChange={(e) => setCocktailId(e.target.value)}
                        className="input-field"
                    />
                    <button type="submit" className="button">Get Cocktail</button>
                </form>

                {cocktailLoading && <p className="loading">Loading cocktail details....</p>}
                {cocktailError && <p className="error">No cocktail found for ID {idToFetch}</p>}
                {cocktail && (
                    <div className="cocktail-details">
                        <h3>Cocktail Details</h3>
                        <p><strong>Name:</strong> {cocktail[0]}</p>
                        <p><img onClick={playSound} src={cocktail[1]} /></p>
                        <p><strong>Category:</strong> {cocktail[2]}</p>
                        <p><strong>Alcohol Percentage:</strong> {cocktail[3]}%</p>
                        <p><strong>Type:</strong> {cocktail[4]}</p>
                        <p><strong>Price:</strong> {cocktail[5].toString()} ETH</p>
                        <p><strong>Average Rating:</strong> {cocktail[6].toString()}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlockchainComponent;