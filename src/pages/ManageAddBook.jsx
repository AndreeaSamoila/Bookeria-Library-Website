import Container from "@mui/material/Container";
import { Box, Button, Grid, Stack, TextField, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {PhotoCamera} from "@mui/icons-material";


export default function() {

    const [selectedImage, setSelectedImage]= useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');

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

    const handleSubmit = async (event) => {

        event.preventDefault();
        const formData = new FormData();

        formData.append("content", URL.createObjectURL(selectedImage));
        // formData.append('title', title);
        // formData.append('author', author);
        // formData.append('description', description);

        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzViZWQ1NmY3NDkxNmI5ZDc1ODc5NTgiL" +
                "CJpYXQiOjE2NzgzMDQwNzY5NTUsInR5cGUiOiJhY2Nlc3MifQ.T7uXUlV-51QQMZMWqHLNI4fTiBd1mdZjX9SdRQlLVOQ",
            "Content-Type": "application/octet-stream"
        }
        const responseCreate = await fetch('https://itschool-library.onrender.com/book', {

            method: 'POST',
            body: formData,
            headers: headersList,

        });
        let dataCreate = await responseCreate;
        console.log(dataCreate);
        // const response = await fetch('https://itschool-library.onrender.com/book/' + dataCreate.id, {
        //     method: 'PUT',
        //     body: formData,
        //     headers: headersList
        // });
        // const data = await response.text();
        // console.log(data);
    }
    return(

        <Container spacing={2} style={{ minHeight: 700, width: '100%' }}>
            <Box>
            <Typography variant="h3"> Add Book</Typography>
                <Box component="form" action={"/upload"} method="POST" onSubmit={handleSubmit} noValidate sx={{ mt: 2}}>
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
                                        <img style={{width: "270px", height: "270px"}} src={imageUrl} alt={selectedImage.name} height="100px" />
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
                    <Button sx={{ my: 2,display: "flex", width: "18%"}} type="submit" variant="contained">
                        Add Book
                    </Button>
                    </Stack>
                </Box>
        </Box>
        </Container>
    )
}