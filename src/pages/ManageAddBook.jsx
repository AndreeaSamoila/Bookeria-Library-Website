import {useFetchData} from "../hooks/useFetchData.js";
import {addBook} from "../services/book.js";
export default function() {

    const {data: book, error, loading,} = useFetchData(
        {
            fetcher: () => addBook(),
        });

    return(
        <div style={{ minHeight: 700, width: '100%' }}>


        </div>

    )
}