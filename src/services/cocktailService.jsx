const baseURL = 'https://www.thecocktaildb.com/api/json/v2/1/';

export const getAllCocktails = () => {
    return fetch(`${baseURL}search.php?s=`)
        .then(res => res.json())
}

export const searchCocktail = (cocktailName) => {
    return fetch(`${baseURL}search.php?s=${cocktailName}`)
        .then(res => res.json())
}

export const getRandomCocktail = () => {
    return fetch(`${baseURL}random.php`)
        .then(res => res.json())
}