import {Box, CircularProgress, Divider, Fab, Grid, Stack, Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import {getBookById} from "../services/book.js";
import {useFetchData} from "../hooks/useFetchData";
import {useContext} from "react";
import {FavoriteBooksContext} from "../contexts/favoriteBooks/FavoriteBooksContext.js";
import FavoriteIcon from "@mui/icons-material/Favorite.js";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder.js";

export default function() {


    const {id} = useParams();
    const {data: book, error, loading,} = useFetchData(
        {
            fetcher: () => getBookById(id),
        });
    const {favorite, handleAddToFavorites} = useContext(FavoriteBooksContext)

    let iconStored = favorite.find(elem => elem.id === id);
    const favoriteIcon = iconStored ? true : false


    if(loading) {
        return <CircularProgress />;
    }
    return <Box>
    <Grid container spacing={4}>
        <Grid item xs={12} sm={4}>
        <img style={{width: "100%"}}
             src={book.coverImageURL}
             title={book.title}
             alt={book.title}
             />
        </Grid>
        <Grid item xs={12} sm={8}>
            <Stack sx={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
        <Typography variant="h3">{book.title} </Typography>
            <Fab
                sx={{width: "40px", height: "40px", my: "2px"}}
                aria-label="like"
                disabled={favoriteIcon}
                onClick={() => {
                    handleAddToFavorites(book)
                }}
                color={favoriteIcon ? "#FF4500" : "secondary"}
            >
                {favoriteIcon ? (
                    <FavoriteIcon sx={{width: "20px", height: "20px", color: "#FF4500"}} />
                ) : (
                    <FavoriteBorderIcon sx={{width: "20px", height: "20px"}} />
                )}
            </Fab>
            </Stack>
        <Typography sx={{ mt: 1}}  variant="body1">by {book.author} </Typography>

            <Divider sx={{ my: 3}} />
            <Typography variant="body1">Owned by {book.owner.firstName} {book.owner.lastName}</Typography>
        </Grid>
    </Grid>
        <Divider sx={{ my: 3}} />

        <Typography variant="h3">Description</Typography>
        <Typography variant="body1">{book.description} </Typography>

    </Box>
}