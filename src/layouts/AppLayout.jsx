import {Box, Container} from "@mui/material";
import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { ToastContainer } from "react-toastify";

export function AppLayout() {
    return <Box className="layout-root">
        <ToastContainer />
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