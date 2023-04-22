import {createTheme, ThemeProvider} from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: "#31d093",
        }
    }

});

export default function({children}) {
    return <ThemeProvider theme={theme}>
        {children}
    </ThemeProvider>
}