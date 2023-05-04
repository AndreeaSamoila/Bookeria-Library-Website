import {useLocalStorage} from "../../hooks/useLocalStorage.js";
import {FavoriteBooksContext} from "./FavoriteBooksContext.js";

export function FavoriteContextProvider({ children }) {

    const [favorite, setFavorite] = useLocalStorage("favoriteBook", []);

    const handleAddToFavorites = (elem) => {
        setFavorite([...favorite, elem]);
    };

    const handleRemoveToFavorites = (elem) => {
        const newListBooks = favorite.filter((book) => book.id !== elem.id)
        setFavorite(newListBooks);
    };

    return (
        <FavoriteBooksContext.Provider
            value={{
                favorite,
                handleAddToFavorites,
                handleRemoveToFavorites
            }}
        >
            {children}
        </FavoriteBooksContext.Provider>
    );

}