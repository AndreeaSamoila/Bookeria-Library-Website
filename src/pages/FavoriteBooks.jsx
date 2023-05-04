import {useContext} from "react";
import { Link } from 'react-router-dom';
import {Box, Card, CardContent, CardMedia, Grid, Stack, Tooltip, Typography} from "@mui/material";
import {FavoriteBooksContext} from "../contexts/favoriteBooks/FavoriteBooksContext.js";
import DeleteIcon from '@mui/icons-material/Delete';
import {ScrollToTop} from "../components/ScrollToTop.jsx";
export default function() {

    const { favorite, handleRemoveToFavorites } = useContext(FavoriteBooksContext)

    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Grid container spacing={4}>
                {favorite.length !== 0 ? (
                    favorite.map((book) => {
                        return (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}  >
                                <Card sx={{ maxWidth: 345 }}>
                                    <Link to={`/book/${book.id}`}>
                                        <CardMedia
                                            sx={{ height: 400 }}
                                            image={book.coverImageURL}
                                            alt={book.title}
                                            title={book.title}
                                        />
                                        <CardContent sx={{ textAlign: "center", paddingBottom: "0px" }}>
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
                                            }} variant="body2" color="text.secondary">
                                                {book.author}
                                            </Typography>
                                        </CardContent>
                                    </Link>
                                        <CardContent sx={{ textAlign: "right", py: "0" }}>
                                            <Tooltip title="Remove from favorite">
                                            <DeleteIcon sx={{ width: "30px", height: "30px", my: "0px", cursor: "pointer"}} aria-label="like" onClick={() => {
                                                handleRemoveToFavorites(book)
                                            }} />
                                              </Tooltip>
                                        </CardContent>
                                </Card>
                            </Grid>
                        );
                    })
                ) : (
                    <Stack sx={{ display: "flex", direction: "column", alignItem: "center", justifyContent: "center", minHeight: "100vh", width: "100%",
                        '@media (max-width: 600px)': {
                            textAlign: "center",
                        },
                        }} >

                    <Typography variant="h4" component="div" sx={{ display: "flex",textAlign: "center",alignItem: "center", justifyContent: "center"  }}>
                        You have not added any favorite books yet.
                    </Typography>

                    <Typography variant="body1" component="div" sx={{display: "flex", textAlign: "center", alignItem: "center", justifyContent: "center" }}>
                            Check the Home Page and add some favorites books.
                    </Typography>
                    </Stack>
                )}
            </Grid>
            <ScrollToTop />
        </Box>
    );
}
