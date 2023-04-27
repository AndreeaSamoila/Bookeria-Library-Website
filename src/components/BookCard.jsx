import * as React from 'react';
import {Button, Card, CardContent, CardMedia, Fab, Typography} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export function BookCard({book, handleAddToFavorites}) {
        console.log({book});
    const navigateTo = useNavigate();
        return (

            <Card sx={{ maxWidth: 345 }}>
                <Link to={`/book/${book.id}`} >
                <CardMedia
                    sx={{ height: 400 }}
                    image={book.coverImageURL}
                    alt={book.title}
                    title={book.title}
                />
                <CardContent sx={{textAlign: "center", paddingBottom: "0px"}}>
                    <Typography sx={{
                        height: "4rem",
                        lineHeight: "2rem",
                        textOverflow: "elipsis",
                        overflow: "hidden",
                    }} gutterBottom variant="h5" component="div">
                        {book.title}
                    </Typography>
                    <Typography sx={{
                        height: "4rem",
                        lineHeight: "2rem",
                        textOverflow: "elipsis",
                        overflow: "hidden",
                    }}
                        variant="body2" color="text.secondary">
                        {book.author}
                    </Typography>
                </CardContent>
                </Link>
                <CardContent sx={{textAlign: "right", py:"0" }}>
                    <Fab  sx={{width: "40px", height: "40px", my: "0px"}} aria-label="like" onClick={() => {
                        navigateTo("/favoriteBooks");
                        handleAddToFavorites(book)
                    }}>
                        <FavoriteBorderIcon sx={{width: "20px", height: "20px"}} />
                    </Fab>
                </CardContent>
            </Card>

        );
}