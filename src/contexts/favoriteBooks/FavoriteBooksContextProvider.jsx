import {useLocalStorage} from "../../hooks/useLocalStorage.js";

export function FavoriteContextProvider({ children }) {

    const [favorite, setFavorite] = useLocalStorage("", []);

    const handleAddToFavorites = (book) => {
        setFavorite([...favorite, book]);
    };
    return (
        <FavoriteBooksContext.Provider
            value={{
                favorite,
                handleAddToFavorites,
            }}
        >
            {children}
        </FavoriteBooksContext.Provider>
    );

}