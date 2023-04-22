import {Alert, Box, Button, Grid, Link, TextField, Typography} from "@mui/material";
import {NavLink, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {register as registerService} from "../services/auth.js"
import {useState} from "react";

const UserRegisterSchema = z.object({
    firstName: z.string().min(4, "First Name is required "),
    lastName: z.string().min(1, "Last Name is required "),
    email: z.string().email("Email is required").min(1,  "Invalid Email"),
    password: z.string().min(1, "Password is required "),
    confirmPassword: z.string().min(1, "Confirm Password is required "),
}).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
        ctx.addIssue({
            code: "custom",
            message: "The passwords did not match",
            path: ["confirmPassword"],
        });
    }
});

export default function() {
    const [serverError, setServerError] = useState("");
    const navigate = useNavigate();

    const {register, formState:{errors}, handleSubmit} = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    resolver: zodResolver(UserRegisterSchema),
    });


    function displayErrors(key) {
    const error = errors[key];
    return {
        error: Boolean(error),
        helperText: error && error.message
    }
}
    function onSubmit(data) {
        console.log(data);
        setServerError("");

        registerService(data)
        .then((user) => {
            console.log("Success", user);
            navigate("/login");
        })
        .catch((err) => {
            console.log("err", err);
            setServerError(err.data.message);
        });
    }

    return (
        <Box className="flexCenter" sx={{ mt: 12}}>
            <Typography variant="h5">Sign up </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2}}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            {...register("firstName")}
                            {...displayErrors("firstName")}
                            label="First Name"
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            {...register("lastName")}
                            {...displayErrors("lastName")}
                            label="Last Name"
                            fullWidth
                            required
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            {...register("email")}
                            {...displayErrors("email")}
                            label="Email Address"
                            type="email"
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            {...register("password")}
                            {...displayErrors("password")}
                            label="Password"
                            type="password"
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            {...register("confirmPassword")}
                            {...displayErrors("confirmPassword")}
                            label="Confirm Password"
                            type="password"
                            fullWidth
                            required
                        />
                    </Grid>
                </Grid>
                {serverError && (
                    <Alert sx={{ my: 2 }} severity="error">
                        {serverError}
                    </Alert>
                )}

                <Button sx={{ my: 2 }}  type="submit" variant="contained" fullWidth>
                    Sign Up
                </Button>

                <Link component={NavLink} to="/login" variant="body1">
                    Already have an account? Sign In
                </Link>
            </Box>
        </Box>
    );
}