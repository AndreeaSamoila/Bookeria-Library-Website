import { Box, Typography, Link, TextField, Button, Alert } from "@mui/material";
import { useState } from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "react-toastify";
import {useAuthContext} from "../contexts/auth/AuthContext.js";


const UserLoginSchema = z.object({
    email: z.string().email("Email is required").min(9,  "Invalid Email"),
    password: z.string().min(3, "Password is required "),
});

export default function() {

    const { user, login } = useAuthContext();
    const [serverError, setServerError] = useState("");
    const navigate = useNavigate();

    const {register, formState:{errors}, handleSubmit} = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: zodResolver(UserLoginSchema),
    });

    function displayErrors(key) {
        const error = errors[key];
        return {
            error: Boolean(error),
            helperText: error && error.message
        }
    }

    function onSubmit(data) {
        login(data)
            .then(() => {
                console.log("Success", user);
                navigate("/");
                toast.info(`Welcome Home`);
            })
            .catch((err) => {
                console.log("err", err);
                toast.error("Invalid email or password");
            });
    }


    return (
        <Box className="flexCenter" sx={{ mt: 12}}>
            <Typography variant="h5">Sign In </Typography>
            {/*{ user ? `Logged in With ${user.firstName} ${user.lastName}` : "Not Logged In"}*/}
            <Typography variant="body1">
                or {" "}
                <Link component={NavLink} to="/">
                    explore the app
                    </Link>
                </Typography>
           <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt:2}}>
                <TextField
                {...register("email")}
                {...displayErrors("email")}
                label="Email"
                type="email"
                fullWidth
                margin="normal"
                required
                />
                <TextField
                {...register("password")}
                {...displayErrors("password")}
                label="Password"
                type="password"
                fullWidth
                margin="normal" 
                required 
                 />
                 {serverError && <Alert severity="error"> {serverError}</Alert>}
                <Button sx={{ my: 2 }}  type="submit" variant="contained" fullWidth>
                    Sign In
                </Button>
                <Link component={NavLink} to="/register" variant="body1">
                    Don't have an account? Sign up
                </Link>
           </Box>
        </Box>
    );
}

