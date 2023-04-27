import { createTheme, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { ThemeContext } from "./ThemeContext";
import {palette} from "../../theme/index.jsx";

export function ThemeContextProvider({children}) {

    const [mode, setMode] = useState("light");
      const [theme, setTheme] = useState(() =>
        createTheme({
          palette,
        })
      );

    function toggleMode() {
        let newMode = mode === "light" ? "dark" : "light";
        setTheme(
          createTheme({
            palette: {
              mode: newMode,
              ...palette,
            },
          })
        );
        setMode(newMode);
    }


    return (
        <ThemeContext.Provider  value={{
            toggleMode,
        }}>
            <ThemeProvider theme={theme} >{children}</ThemeProvider>
    </ThemeContext.Provider>
            );
}
