import {useFetchData} from "../hooks/useFetchData.js";
import {getBookById, getMyBooks, updateBook} from "../services/book.js";
import {useParams} from "react-router-dom";

export default function() {

    const {id} = useParams();
    const {data: book, error, loading,} = useFetchData(
        {
            fetcher: () => getBookById(id),
        });

    return(
        <div style={{ minHeight: 700, width: '100%' }}>
        </div>

    )
}