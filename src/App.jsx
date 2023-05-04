import './App.css'
import { AuthContextProvider } from './contexts/auth/AuthContextProvider';
import Routes from "./routes";
import {CssBaseline} from "@mui/material";
import {ThemeContextProvider} from "./contexts/theme/ThemeContextProvider.jsx";
import {FavoriteContextProvider} from "./contexts/favoriteBooks/FavoriteBooksContextProvider";


function App() {
  return (
      <FavoriteContextProvider>
      <ThemeContextProvider>
   <AuthContextProvider>
       <CssBaseline />
      <Routes />
   </AuthContextProvider>
      </ThemeContextProvider>
      </FavoriteContextProvider>
  )
}

export default App;
