import {Box, CircularProgress, Grid, Typography} from "@mui/material";
import { BookCard } from "../components/BookCard";
import Pagination from "../components/Pagination.jsx"
import {useState} from "react";
import {useFetchData} from "../hooks/useFetchData.js";
import {getAllBooks} from "../services/book.js";

    const defaultPage = 1;
    const defaultRecordsPerPage = 8;

export default function(){

    const {data: books, loading, error} =  useFetchData({
        fetcher: getAllBooks,
        initialData: [],
    });

    const [currentPage, setCurrentPage] = useState(defaultPage);
    const [recordsPerPage] = useState(defaultRecordsPerPage);

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

    const currentRecords = books.slice(indexOfFirstRecord,indexOfLastRecord);
    const nPages = Math.ceil(books.length / recordsPerPage)

    if(loading) {
        return <CircularProgress/>
    }
    if(error) {
        return (
            <Box>
                <Typography>
                    Something went wrong with you request ...
                </Typography>
            </Box>
        )
    }

    return (
        <Box>
            <Grid container spacing={2}>

                {currentRecords.map((book) => (
                   <Grid key={book.id} item xs={12} sm={6} md={3}>
                       <BookCard book={book} />
                    </Grid>
                ))}
            </Grid>
            <Pagination
                nPages={nPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </Box>
    );
}
