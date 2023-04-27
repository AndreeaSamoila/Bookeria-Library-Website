import { useState} from "react";
import {useAuthContext} from "../contexts/auth/AuthContext.js";
import {Box, Grid, Typography} from "@mui/material";
import {useFetchData} from "../hooks/useFetchData.js";
import {getAllBooks, getBookById} from "../services/book.js";
import {BookCard} from "../components/BookCard.jsx";

export default function({items}) {

    const { user } = useAuthContext();

    return(
        <Box sx={{display: "flex", justifyContent: "center", alignItems: "center"}} >
            {user ? <Box >
                My favorite books
                <Grid container spacing={2}>

                </Grid>
            </Box> : <Box> <Typography>Something went wrong with you request ...</Typography></Box>}
        </Box>

    )

}
