import * as React from 'react';
import {Card, CardContent, CardMedia, Fab, Tooltip, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {useContext} from "react";
import {FavoriteBooksContext} from "../contexts/favoriteBooks/FavoriteBooksContext.js";
import FavoriteIcon from '@mui/icons-material/Favorite';

export function BookCard({book}) {

    const { handleAddToFavorites, favorite  } = useContext(FavoriteBooksContext)

    let iconStored = favorite.find(elem => elem.id === book.id );
    // const favoriteIcon = iconStored ? true : false
    const favoriteIcon = !!iconStored;

    console.log({book});
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
                    <Tooltip title="Add to favorite">
                    <Fab
                        sx={{width: "40px", height: "40px", my: "0px"}}
                        aria-label="like"
                        disabled={favoriteIcon}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleAddToFavorites(book)
                        }}
                        backgroundcolor={favoriteIcon ? "#FF4500" : "secondary"}
                    >
                        {favoriteIcon ? (
                            <FavoriteIcon sx={{width: "20px", height: "20px", color: "#FF4500"}} />
                        ) : (
                            <FavoriteBorderIcon sx={{width: "20px", height: "20px"}} />
                        )}
                    </Fab>
                    </Tooltip>

                </CardContent>
            </Card>

        );
}