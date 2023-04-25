import Container from "@mui/material/Container";
import {Alert, Box, Button, Grid, Link, Snackbar, Stack, TextField, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {PhotoCamera} from "@mui/icons-material";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import {useAuthContext} from "../contexts/auth/AuthContext.js";
import {useNavigate, useParams} from "react-router-dom";
import {useFetchData} from "../hooks/useFetchData.js";
import {getBookById, updateBook} from "../services/book.js";


export default function() {

    const [selectedImage, setSelectedImage]= useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const {token} = useAuthContext();

    const navigationTo = useNavigate();

    const {id} = useParams();
    const {data: book, error, loading,} = useFetchData(
        {
            fetcher: () => getBookById(id),
        });


    useEffect(() => {
        if(!loading) {
            setTitle(book.title)
            setAuthor(book.author)
            setDescription(book.description)
            setImageUrl(book.coverImageURL)
        }
    }, [loading]);



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

    const showToastMessage = () => {
        toast.success('The book was updated successfully!', {
            position: toast.POSITION.TOP_RIGHT
        });
    };
    const handleSubmit = async (event) => {

        event.preventDefault();

        // const formData = new FormData();
        //
        // formData.append('title', book.title);
        // formData.append('author', book.author);
        // formData.append('description', book.description);
        // formData.append("file", book.selectedImage);
        //
        // const newHeaders = {...headers};
        // delete newHeaders["Content-Type"];
        //
        // await fetch('https://itschool-library.onrender.com/book/' + `${book.id}`, {
        //
        //     method: 'PUT',
        //     body: formData,
        //     headers: newHeaders
        //
        // });

        const bookData = {
            title,
            author,
            description,
            selectedImage
        }
        const response = await updateBook(bookData, book.id);
        //if()blabla //else error blabla

        navigationTo("/manage");
        showToastMessage();

        console.log(response);
    }
    return(

        <Container spacing={2} style={{ minHeight: 700, width: '100%' }}>
            <Box>
                <Typography variant="h3"> Editing {title}</Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2}}>
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
                                    {imageUrl && (
                                        <Box mt={2} textAlign="center">
                                            <div>Image Preview:</div>
                                            <img style={{width: "270px", height: "270px", objectFit: "cover",
                                                border: "solid 1px #CCC"}} src={imageUrl} alt={title} height="100px" />
                                        </Box>
                                    )}
                                    <label htmlFor="select-image" style={{display: "flex", justifyContent: "center", marginTop: '15px'}}>
                                        { selectedImage ? <Button variant="contained">Discard</Button> :
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
                            sx={{ my: 2,display: "flex", width: "18%"}}  variant="contained">
                            Update Book
                        </Button>
                    </Stack>
                </Box>
            </Box>
        </Container>
    )
}