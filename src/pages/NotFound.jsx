import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function() {
    const navigateTo = useNavigate();

    const goHome = () => {
        navigateTo("/");
    };
    return (
        <Container sx={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", my: 4 }}>
            <Typography variant="h3">Page not found</Typography>
            <Typography mt={2} variant="body1">
                Ups...The URL was not found
            </Typography>
            <img
                src="-https://drudesk.com/sites/default/files/2018-02/404-error-page-not-found.jpg"
            />
            <Button onClick={goHome} variant="contained">
                Go to Home Page
            </Button>
        </Container>
    );
}