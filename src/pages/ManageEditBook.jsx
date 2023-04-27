import Container from "@mui/material/Container";
import {Alert, Box, Button, CircularProgress, Grid, Link, Snackbar, Stack, TextField, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {PhotoCamera} from "@mui/icons-material";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate, useParams} from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getBookById, updateBook} from "../services/book";
import {useForm, Controller} from "react-hook-form";
import {useTheme} from "@mui/material/styles";
import {useFetchData} from "../hooks/useFetchData.js";


const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const EditBookSchema = z.object({
    title: z.string().min(3, "Title is required "),
    author: z.string().min(3, "Author is required "),
    description: z.string().min(2,  "Description is required"),
    file: z
        .any()
        .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
        .refine(
            (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
            "Only .jpg, .jpeg, .png and .webp formats are supported."
        )
        .refine((file) => file !== null, "Image is required.",
        )
});

export default function() {

    const {id} = useParams();
    const {data: book, error, loading: loadingBook,} = useFetchData(
        {
            fetcher: () => getBookById(id),
        }, [id]);

    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState("");

    const navigateTo = useNavigate();
    const theme = useTheme();

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: "",
            author: "",
            description: "",
            file: null,
        },
        resolver: zodResolver(EditBookSchema),
    });



    useEffect(() => {
        if (book) {
            reset({
                title: book.title,
                author: book.author,
                description: book.description,
                file: book.coverImageURL,
            });
        }
    }, [book]);



    function displayErrors(key) {
        const error = errors[key];
        return {
            error: Boolean(error),
            helperText: error && error.message,
        };
    }

    function renderImageURL(selectedImage) {

        if (typeof selectedImage === "string") {
            return selectedImage;
        }
        return URL.createObjectURL(selectedImage);
    }

    function onSubmit(data) {
        setLoading(true);
        setServerError("");
        updateBook(data, id)
            .then((book) => {
                navigateTo("/manage");
                toast.success("Book successfully updated");
            })
            .catch((err) => {
                setServerError(err.data.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }
    if (loadingBook) {
        return <CircularProgress />;
    }
    if(serverError) {
      navigateTo("/404");
    }

    return(

        <Container spacing={2} style={{ width: '100%' }}>
            <Box>
                <Typography variant="h5"> Edit Book</Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 2}}>
                    <Grid container spacing={6} sx={{display: "flex"}}  >
                        <Grid item xs={12} md={6} >
                            <TextField
                                sx={{my:1}}
                                label="Title"
                                fullWidth
                                type="text"
                                id="title"
                                placeholder="Title"
                                focused
                                required
                                {...register("title")}
                                {...displayErrors("title")}
                            />
                            <TextField
                                sx={{my:1}}
                                label="Author"
                                fullWidth
                                type="text"
                                id="author"
                                required
                                focused
                                {...register("author")}
                                {...displayErrors("author")}
                            />
                            <TextField
                                sx={{my:1}}
                                label="Description"
                                multiline
                                rows={5}
                                fullWidth
                                type="text"
                                id="description"
                                required
                                focused
                                {...register("description")}
                                {...displayErrors("description")}
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <Controller
                                control={control}
                                name="file"
                                render={({ field: { onChange, value: selectedImage }, fieldState: { error } }) => (
                                    <Grid item xs={12} md={6} >
                                        <Box sx={{display: "flex", flexDirection: "column", borderStyle: "groove", height: "300px"}}>
                                            <Box sx={{display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", textAlign: "center", marginTop: "10px"}} >
                                                { selectedImage && (

                                                    <img style={{width: "140px", height: "200px"}} src={renderImageURL(selectedImage)} alt="photo not available now"  />
                                                        )}
                                                {serverError && (
                                                    <Alert sx={{ my: 2 }} severity="error">
                                                        {serverError}
                                                    </Alert>
                                                )}
                                                <Box>
                                                    { selectedImage !== book.coverImageURL ? (
                                                        <Button sx={{backgroundColor:
                                                                theme.palette.mode === 'dark'  ?  'rgba(255, 255, 255, 0.16)' : theme.palette.primary.main,
                                                            color:
                                                                theme.palette.mode === 'dark'
                                                                    ? '#fff'
                                                                    : '#fff'}}
                                                                variant="contained" onClick={() => {onChange(book.coverImageURL)}}>
                                                            Discard the changes
                                                        </Button>
                                                    ) : (
                                                        <Button  disabled={loading} sx={{backgroundColor:
                                                                theme.palette.mode === 'dark'  ?  'rgba(255, 255, 255, 0.16)' : theme.palette.primary.main,
                                                            color:
                                                                theme.palette.mode === 'dark'
                                                                    ? '#fff'
                                                                    : '#fff', my: 4

                                                        }} variant="contained" color="primary" component="label" >
                                                            <PhotoCamera sx={{mr:1}}/>
                                                            Edit Cover Image
                                                            <input
                                                                accept="image/*"
                                                                type="file"
                                                                hidden
                                                                onChange={(e) => {
                                                                    if (e.target.files && e.target.files.length > 0) {
                                                                        onChange(e.target.files[0]);
                                                                    }
                                                                }}
                                                            />
                                                        </Button>
                                                    )}
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Grid>
                                )}
                            />
                        </Grid>
                    </Grid>
                    <Stack>
                        <Button
                            type="submit"
                            sx={{ my: 2,display: "flex", width: "18%", backgroundColor:
                                    theme.palette.mode === 'dark'  ?  'rgba(255, 255, 255, 0.16)' : theme.palette.primary.main,
                                color:
                                    theme.palette.mode === 'dark'
                                        ? '#fff'
                                        : '#fff', }}
                            variant="contained"
                        >
                             Save changes
                        </Button>
                    </Stack>
                </Box>
            </Box>
        </Container>
    )
}