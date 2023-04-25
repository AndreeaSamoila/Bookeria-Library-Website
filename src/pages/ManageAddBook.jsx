import Container from "@mui/material/Container";
import {Alert, Box, Button, Grid, Link, Snackbar, Stack, TextField, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {PhotoCamera} from "@mui/icons-material";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useAuthContext} from "../contexts/auth/AuthContext.js";
import { useNavigate } from "react-router-dom";
import {addBook} from "../services/book.js";

export default function() {

    const [selectedImage, setSelectedImage]= useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');

    const {token} = useAuthContext();

    const navigationTo = useNavigate();

    useEffect(() => {
        if (selectedImage) {
            setImageUrl(URL.createObjectURL(selectedImage));
        }
    }, [selectedImage]);

    const handleImageUpload = (event) => {
        setSelectedImage(event.target.files[0]);
    };
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleAuthorChange = (event) => {
        setAuthor(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleDiscardImage = () => {
        setSelectedImage(null)
    }
    const showToastMessage = () => {
        toast.success('The book was created successfully!', {
            position: toast.POSITION.TOP_RIGHT
        });
    };
    const handleSubmit = async (event) => {

        event.preventDefault();
        const bookData = {
            title,
            author,
            description,
            selectedImage
        }
        const response = await addBook(bookData);
        console.log(response);
        // try {
        //     switch (response.status) {
        //         case 202:
        //             navigationTo("/manage");
        //             showToastMessage();
        //             break;
        //         case 400:
        //             console.error('Bad Request:', response);
        //             // handle bad request error if necessary
        //             break;
        //         case 404:
        //             console.error('Not Found:', response);
        //             // handle not found error if necessary
        //             break;
        //     }
        // }
        // catch (error) {
        //     console.error('PUT request failed:', error);
        //     // handle error if necessary
        // }
        navigationTo("/manage");
        showToastMessage();
    }
    return(

        <Container spacing={2} style={{ minHeight: 700, width: '100%' }}>
            <Box>
            <Typography variant="h3"> Add Book</Typography>
                <Box component="form"  onSubmit={handleSubmit} noValidate sx={{ mt: 2}}>
                    <Grid container spacing={6} sx={{display: "flex"}}  >
                        <Grid item xs={12} md={6} >
                            <TextField
                                sx={{my:1}}
                                label="Title"
                                fullWidth
                                type="text"
                                value={title}
                                onChange={handleTitleChange}
                                name="title"
                            />
                            <TextField
                                sx={{my:1}}
                                label="Author"
                                fullWidth
                                type="text"
                                value={author}
                                onChange={handleAuthorChange}
                                name="author"
                            />
                            <TextField
                                sx={{my:1}}
                                id="outlined-multiline-flexible"
                                label="Description"
                                multiline
                                rows={5}
                                fullWidth
                                type="text"
                                value={description}
                                onChange={handleDescriptionChange}
                                name="description"
                            />
                        </Grid>
                        <Box>
                            <>
                                <input
                                    accept="image/*"
                                    type="file"
                                    id="select-image"
                                    style={{ display: 'none' }}
                                    onChange={handleImageUpload}
                                    name="image"
                                />
                              <Box sx={{display: "flex", flexDirection: "column"}}>
                                {imageUrl && selectedImage && (
                                    <Box mt={2} textAlign="center">
                                        <div>Image Preview:</div>
                                        <img style={{width: "270px", height: "270px", objectFit: "cover",
                                            border: "solid 1px #CCC"}} src={imageUrl} alt={selectedImage.name} height="100px" />
                                    </Box>
                                )}
                                <label htmlFor="select-image" style={{display: "flex", justifyContent: "center", marginTop: '15px'}}>
                                    { selectedImage ? <Button variant="contained" onClick={handleDiscardImage}>Discard</Button> :
                                        <Button  variant="contained" color="primary" component="span">
                                            <PhotoCamera sx={{mr:1}}/>Upload Cover Image
                                        </Button> }
                                </label>
                              </Box>
                            </>
                        </Box>
                    </Grid>
                    <Stack>

                    <Button type="submit"
                            sx={{ my: 2,display: "flex", width: "18%"}} variant="contained">
                         Add Book
                    </Button>
                    </Stack>
                </Box>
        </Box>
        </Container>
    )
}