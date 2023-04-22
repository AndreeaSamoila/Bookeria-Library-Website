import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function() {
    return (
    <Box>
        <Container maxWidth="xs">
            <Outlet />
        </Container>
    </Box>

    );
}