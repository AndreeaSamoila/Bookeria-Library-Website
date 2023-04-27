import {Box, Link, Typography} from "@mui/material";
import { useTheme } from '@mui/material/styles';

export function Footer()  {

    const theme = useTheme();

    return(
        <footer style={{ backgroundColor: theme.palette.mode === 'dark' ? "rgba(255, 255, 255, 0.16)" : '#01579b'}} >

            <Typography variant="body2" sx={{display: "flex",
                justifyContent: "center",
                alignItems:"center",
                py:2,
                color: theme.palette.mode === 'dark' ? '#fff' : '#fff',
            }}  >
                © 2023 My Website. All rights reserved.
            </Typography>

        </footer>

    )

}