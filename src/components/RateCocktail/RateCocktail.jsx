import { useWriteContract, useReadContract } from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../../utils/contract-info";
import { ethers } from "ethers";
import "./RateCocktail.css";

const RateCocktail = () => {
    const { writeContract } = useWriteContract();
    const { data: cocktailCount } = useReadContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'getCockltailCount',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { cocktail_id, rating } = e.target.elements;

        const cocktail_idValue = parseInt(cocktail_id.value);
        const ratingValue = parseFloat(rating.value);

        if (cocktail_idValue < 0 || cocktail_idValue >= Number(cocktailCount.toString())) {
            alert('Invalid cocktail ID entered!');
            return;
        }
        if (ratingValue < 1 || ratingValue > 5) {
            alert('Invalid rating value entered!');
            return;
        }

        writeContract({
            address: CONTRACT_ADDRESS,
            abi: CONTRACT_ABI,
            functionName: "rateCocktail",
            args: [cocktail_idValue, ratingValue],
            overrides: {
                gasLimit: 50000,
                gasPrice: ethers.parseUnits("1", "gwei"),
            },
        })
        cocktail_id.value = '';
        rating.value = '';
    }

    return (
        <div className="rate-cocktail-page">
            <h1>Rate Cocktail by ID from the Blockchain ({cocktailCount !== undefined && Number(cocktailCount.toString()) - 1} cocktails)</h1>
            <form onSubmit={handleSubmit} className="cocktail-form">
                <div className="form-group">
                    <label htmlFor="cocktail_id">Cocktail ID:</label>
                    <input className="rate-cocktail-input" type="number" id="cocktail_id" name="cocktail_id" placeholder="Enter cocktail ID...." required />
                </div>
                <div className="form-group">
                    <label htmlFor="rating">Rating (from 1 to 5):</label>
                    <input className="rate-cocktail-input" type="number" id="rating" name="rating" placeholder="Enter rating...." required />
                </div>
                <button type="submit" className="submit-button">
                    Rate Cocktail
                </button>
            </form>
        </div>
    );
};

export default RateCocktail;