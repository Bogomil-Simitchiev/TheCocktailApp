import useSound from "use-sound";
import cocktailSound from '../assets/sounds/cocktail-sound.mp3';

export const playCocktailSound = () => {
    const [play] = useSound(cocktailSound);

    return [play];
}