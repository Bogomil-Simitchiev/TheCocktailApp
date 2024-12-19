import { useWriteContract } from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../../utils/contract-info";
import { ethers } from "ethers";
import "./AddCocktail.css";

const AddCocktail = () => {
    const { writeContract } = useWriteContract();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, imageUrl, category, alcoholPercentage, cocktailType, price } = e.target.elements;

        if (!name.value.trim() || !imageUrl.value.trim() || !category.value.trim() || !alcoholPercentage.value.trim() || !cocktailType.value.trim() || !price.value.trim()
        ) {
            alert("Please fill in all fields.");
            return;
        }

        const alcoholPercentageValue = parseInt(alcoholPercentage.value);
        const priceValue = parseFloat(price.value);

        writeContract({
            address: CONTRACT_ADDRESS,
            abi: CONTRACT_ABI,
            functionName: "addCocktail",
            args: [name.value, imageUrl.value, category.value, alcoholPercentageValue, cocktailType.value, priceValue],
            overrides: {
                gasLimit: 50000,
                gasPrice: ethers.parseUnits("1", "gwei"),
            },
        });

        name.value = '';
        imageUrl.value = '';
        category.value = '';
        alcoholPercentage.value = '';
        cocktailType.value = '';
        price.value = ''
    };

    return (
        <div className="add-cocktail-page">
            <h1>Add a New Cocktail to the Blockchain</h1>
            <form onSubmit={handleSubmit} className="cocktail-form">
                <div className="form-group">
                    <label htmlFor="name">Cocktail Name:</label>
                    <input className="add-cocktail-input" type="text" id="name" name="name" placeholder="Name" required />
                </div>
                <div className="form-group">
                    <label htmlFor="imageUrl">Image URL:</label>
                    <input className="add-cocktail-input" type="text" id="imageUrl" name="imageUrl" placeholder="Image URL" required />
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category:</label>
                    <input className="add-cocktail-input" type="text" id="category" name="category" placeholder="Category" required />
                </div>
                <div className="form-group">
                    <label htmlFor="alcoholPercentage">Alcohol Percentage:</label>
                    <input className="add-cocktail-input" type="number" id="alcoholPercentage" name="alcoholPercentage" placeholder="Alcohol Percentage" required />
                </div>
                <div className="form-group">
                    <label htmlFor="cocktailType">Type:</label>
                    <input className="add-cocktail-input" type="text" id="cocktailType" name="cocktailType" placeholder="Type (e.g., Classic)" required />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price (ETH):</label>
                    <input className="add-cocktail-input" type="number" id="price" name="price" placeholder="Price (in ETH)" required />
                </div>
                <button type="submit" className="submit-button">
                    Add Cocktail
                </button>
            </form>
        </div>
    );
};

export default AddCocktail;