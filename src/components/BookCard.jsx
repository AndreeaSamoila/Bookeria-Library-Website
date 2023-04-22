import * as React from 'react';
import { Card, CardContent, CardMedia, Typography} from "@mui/material";
import {Link} from "react-router-dom";

export function BookCard({book}) {
        console.log({book});

        return (
            <Link to={`/book/${book.id}`} >
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    sx={{ height: 400 }}
                    image={book.coverImageURL}
                    alt={book.title}
                    title={book.title}
                />
                <CardContent sx={{textAlign: "center" }}>
                    <Typography sx={{
                        height: "4rem",
                        lineHeight: "2rem",
                        textOverflow: "elipsis",
                        overflow: "hidden"
                    }} gutterBottom variant="h5" component="div">
                        {book.title}
                    </Typography>
                    <Typography sx={{
                        height: "4rem",
                        lineHeight: "2rem",
                        textOverflow: "elipsis",
                        overflow: "hidden"
                    }}
                        variant="body2" color="text.secondary">
                        {book.author}
                    </Typography>

                </CardContent>

            </Card>
            </Link>
        );
}