import './App.css'
import { AuthContextProvider } from './contexts/auth/AuthContextProvider';
import Routes from "./routes";
import {CssBaseline} from "@mui/material";
import Theme from "./theme";
import {BookContextProvider} from "./contexts/books/BooksContextProvider";

function App() {
  return (
      <BookContextProvider>
   <AuthContextProvider>
       <Theme>
       <CssBaseline />
      <Routes />
       </Theme>
   </AuthContextProvider>
      </BookContextProvider>
  )
}

export default App;
