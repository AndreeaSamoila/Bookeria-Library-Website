import {useFetchData} from "../../hooks/useFetchData.js";
import {getAllBooks} from "../../services/book.js";
import {BooksContext} from "./BooksContext";


export function BookContextProvider({children}) {

    const {data: books, loading, error} =  useFetchData({
        fetcher: getAllBooks,
        initialData: [],
    });
    const object = {
        books,
        loading,
        error
    }

    return <BooksContext.Provider value={object}>
        {children}
    </BooksContext.Provider>;
}