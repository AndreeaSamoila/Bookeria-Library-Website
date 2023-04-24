import {createTheme, ThemeProvider} from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: "#01579b",
        }
    }

});

export default function({children}) {
    return <ThemeProvider theme={theme}>
        {children}
    </ThemeProvider>
}