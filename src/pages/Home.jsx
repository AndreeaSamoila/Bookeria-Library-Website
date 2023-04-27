import {Box, Button, CircularProgress, Grid, Typography} from "@mui/material";
import { BookCard } from "../components/BookCard";
import Pagination from "../components/Pagination.jsx"
import {useEffect, useState} from "react";
import {searchBook} from "../services/book.js";
import {BookSearch} from "../components/BookSearch";
import {ScrollToTop} from "../components/ScrollToTop";
import {FavoriteBooks} from "./index.js";


    const defaultPage = 1;
    const defaultRecordsPerPage = 8;

export default function(){

    const [searchTerm, setSearchTerm] = useState("");

    const [loading, setLoading] = useState(true);
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null);
    const [favorites, setFavorites] = useState([]);

    const handleSearch = (searchTerm) => {
        setSearchTerm(searchTerm)

    };
    const handleAddToFavorites = (book) => {
        setFavorites([...favorites, book]);
        console.log("a mers ")
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
        return <CircularProgress />
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
            <Typography variant="h5">All Books Available</Typography>
            <BookSearch onSearch={handleSearch}/>

            <Grid container spacing={2}>

                {currentRecords.map((book) => (
                   <Grid key={book.id} item xs={12} sm={6} md={3}>

                       <BookCard book={book} handleAddToFavorites={handleAddToFavorites}  />

                    </Grid>
                ))}
            </Grid>
            <Pagination
                nPages={nPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
            <ScrollToTop />
            {/*<FavoriteBooks items={favorites} />*/}
        </Box>
    );
}
