import {Box, Grid, InputBase, Paper} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SearchIcon from '@mui/icons-material/Search';
import {useState} from "react";

export function BookSearch({onSearch} ) {

    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchBooks = async () => {
        onSearch(searchTerm)
    };
    return (
        <Box sx={{display: "flex", justifyContent:'flexEnd'}}>
            <Paper
                sx={{ my: 2, p: '2px 4px', display: 'flex', alignItems: 'center', justifyContent:'flexEnd', alignSelf: 'flexEnd', width: 400 }}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Searching for a book..."
                    type="text"
                    value={searchTerm}
                    inputProps={{ 'aria-label': 'Search for a book by title' }}
                    onChange={
                        e => setSearchTerm(e.target.value)
                    }
                />
                <IconButton sx={{ p: '10px' }} aria-label="search"
                onClick={
                    handleSearchBooks
                }>
                    <SearchIcon />
                </IconButton>
            </Paper>

        </Box>
    );
}