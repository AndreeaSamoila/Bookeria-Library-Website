import {Box, CircularProgress, Grid, Typography} from "@mui/material";
import { BookCard } from "../components/BookCard";
import {getAllBooks} from "../services/book.js";
import {useFetchData} from "../hooks/useFetchData.js";

export default function(){

    const {data: books, loading, error} =  useFetchData({
    fetcher: getAllBooks,
    initialData: [],
});

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

                {books.map((book) => (
                   <Grid key={book.id} item xs={12} sm={6} md={3}>
                       <BookCard book={book} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
