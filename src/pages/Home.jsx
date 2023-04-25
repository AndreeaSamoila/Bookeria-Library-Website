import {Box, CircularProgress, Grid, Typography} from "@mui/material";
import { BookCard } from "../components/BookCard";
import Pagination from "../components/Pagination.jsx"
import {useEffect, useState} from "react";
import {searchBook} from "../services/book.js";
import {BookSearch} from "../components/BookSearch";


    const defaultPage = 1;
    const defaultRecordsPerPage = 8;

export default function(){

    const [searchTerm, setSearchTerm] = useState("");

    const [loading, setLoading] = useState(true);
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null);

    const handleSearch = (searchTerm) => {
        setSearchTerm(searchTerm)

    };

    useEffect(() => {
        const requesting = async () => {
            setLoading(true);
            searchBook(searchTerm).then((data) => {
                console.log("then")
                setBooks(data.results);
            })
                .catch((err) => {
                    console.log("error")
                    setError(err);
                })
                .finally(() => {
                    console.log("finally")
                    setLoading(false);
                });
        }
        requesting();

    }, [searchTerm])

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
                    Something went wrong with your request ...
                </Typography>
            </Box>
        )
    }

    return (
        <Box >
            <BookSearch onSearch={handleSearch}/>

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
