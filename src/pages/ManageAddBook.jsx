import Container from "@mui/material/Container";
import {Alert, Box, Button, CircularProgress, Grid, Link, Snackbar, Stack, TextField, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {PhotoCamera} from "@mui/icons-material";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {addBook} from "../services/book";
import {useForm, Controller} from "react-hook-form";
import {useTheme} from "@mui/material/styles";


const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const AddBookSchema = z.object({
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

    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState("");
    const theme = useTheme();
    const navigateTo = useNavigate();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: "",
            author: "",
            description: "",
            file: null,
        },
        resolver: zodResolver(AddBookSchema),
    });

    function displayErrors(key) {
        const error = errors[key];
        return {
            error: Boolean(error),
            helperText: error && error.message,
        };
    }

    function onSubmit(data) {
        setLoading(true);
        setServerError("");
        addBook(data)
            .then((book) => {
                navigateTo("/manage");
                toast.success("Book successfully added");
            })
            .catch((err) => {
                setServerError(err.data.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    if (serverError) {
        navigateTo("/404");
    }
    if(loading) {
       return <CircularProgress />
    }


    return(

        <Container spacing={2} style={{ width: '100%' }}>
            <Box>
                <Typography variant="h5"> Add Book</Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 2}}>
                    <Grid container spacing={6} sx={{display: "flex"}}  >
                        <Grid item xs={12} md={6} >
                            <TextField
                                sx={{my:1}}
                                label="Title"
                                fullWidth
                                type="text"
                                id="title"
                                name="title"
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
                                name="author"
                                required
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
                                name="description"
                                required
                                {...register("description")}
                                {...displayErrors("description")}
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                        <Controller
                            control={control}
                            name="file"
                            render={({ field: { onChange, value: selectedImage }, fieldState: { error } }) => (
                                    <Grid item xs={12} md={6}
                                          sx={{ '@media (min-width: 1078px)': {
                                                  paddingLeft: "40px !important",
                                              },  '@media (min-width: 870px)': {
                                                  paddingLeft: "40px !important",
                                              }}}>
                                        <Box sx={{display: "flex", flexDirection: "column", borderStyle: "groove", height: "300px"}}>
                                            <Box sx={{display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", textAlign: "center", marginTop: "10px"}} >
                                                {!selectedImage && (
                                                    <Button sx={{backgroundColor:
                                                            theme.palette.mode === 'dark'  ?  'rgba(255, 255, 255, 0.16)' : theme.palette.primary.main,
                                                        color:
                                                            theme.palette.mode === 'dark'
                                                                ? '#fff'
                                                                : '#fff',
                                                       my:4
                                                    }} variant="contained" color="primary" component="label" >
                                                        <PhotoCamera sx={{mr:1}}/>
                                                        Upload Cover Image
                                                        <input
                                                               accept="image/*"
                                                               type="file"
                                                               hidden
                                                               onChange={(e) => {
                                                                   if (e.target.files && e.target.files.length > 0) {
                                                                       // console.log(e.target.files[0]);
                                                                       onChange(e.target.files[0]);
                                                                   }
                                                        }}
                                                               />
                                                    </Button>
                                                )}
                                                {error && <Box sx={{py:2}}>{error.message}</Box>}
                                                {selectedImage && (
                                                    <Box sx={{display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", textAlign: "center", marginTop: "10px"}}>
                                                        <img style={{width: "140px", height: "200px"}} src={URL.createObjectURL(selectedImage)} alt="photo not available now"  />
                                                        <Button sx={{backgroundColor:
                                                                theme.palette.mode === 'dark'  ?  'rgba(255, 255, 255, 0.16)' : theme.palette.primary.main,
                                                            color:
                                                                theme.palette.mode === 'dark'
                                                                    ? '#fff'
                                                                    : '#fff', my:2}}
                                                            variant="contained" onClick={() => {onChange(null)}}>
                                                            Discard
                                                        </Button>
                                                        {serverError && (
                                                            <Alert sx={{ my: 2 }} severity="error">
                                                                {serverError}
                                                            </Alert>
                                                        )}
                                                    </Box>
                                                )}
                                            </Box>
                                        </Box>
                                    </Grid>
                            )}
                        />
                        </Grid>
                    </Grid>
                    <Box sx={{width: "100%",  display: "flex", minWidth: "10px"}}>
                        <Button
                            type="submit"
                            sx={{ my: 2, padding: "6px 16px", display: "flex", backgroundColor:
                                    theme.palette.mode === 'dark'  ?  'rgba(255, 255, 255, 0.16)' : theme.palette.primary.main,
                                color:
                                    theme.palette.mode === 'dark'
                                        ? '#fff'
                                        : '#fff', }}
                            variant="contained"
                        >

                            Add Book
                    </Button>
                    </Box>
                </Box>
        </Box>
        </Container>
    )
}