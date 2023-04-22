import {Box, Container} from "@mui/material";
import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";

export function AppLayout() {
    return <Box className="layout-root">
        <Header />
        <Container maxWidth="lg"
                   sx={{
                   flexGrow: 1,
                   py: 4 }}
             >
            <Outlet />
        </Container>
    </Box>
}