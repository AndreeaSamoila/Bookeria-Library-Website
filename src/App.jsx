import './App.css'
import { AuthContextProvider } from './contexts/auth/AuthContextProvider';
import Routes from "./routes";
import {CssBaseline} from "@mui/material";
import {ThemeContextProvider} from "./contexts/theme/ThemeContextProvider.jsx";


function App() {
  return (
      <ThemeContextProvider>
   <AuthContextProvider>
       <CssBaseline />
      <Routes />
   </AuthContextProvider>
      </ThemeContextProvider>
  )
}

export default App;
