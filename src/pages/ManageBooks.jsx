import {Box, Button, CircularProgress, Stack, Typography} from "@mui/material";
import * as React from 'react';
import {DataGrid} from '@mui/x-data-grid';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import {useFetchData} from "../hooks/useFetchData.js";
import {getMyBooks, updateBook} from "../services/book.js";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";


export default function () {

    const [selectedRow, setSelectedRow] = useState(null);
    const navigateTo = useNavigate();


    const {data: books, loading, error} = useFetchData({
        fetcher: getMyBooks,
        initialData: [],
    });

    if (loading) {
        return <CircularProgress/>
    }
    if (error) {
        return (
            <Box>
                <Typography>
                    Something went wrong with you request ...
                </Typography>
            </Box>
        )
    }


    const columns = [
        {
            field: 'image', headerName: 'Image', type: 'img', width: 70, renderCell: (params) => {
                return (<img style={{objectFit: "cover", width: "50px"}} src={params.row.coverImageURL}/>
                )
            }
        },
        {field: 'title', headerName: 'Title', width: 170},
        {field: 'author', headerName: 'Author', width: 170},
        {field: 'description', headerName: 'Description', width: 170},
        {field: 'owner', headerName: 'Owner', width: 140},
        {field: 'createdAt', headerName: 'CreatedAt', width: 130},
        {field: 'updatedAt', headerName: 'UpdatedAt', width: 130},
        {
            field: 'actions', headerName: 'Actions', type: 'date', width: 130, renderCell: (params) => {
                return (<Stack direction="row" spacing={2}>
                    <Link to={"/manage/edit/" + params.row.id}>
                        <IconButton onClick={() => {
                            // window.location.href = window.location.href + '/edit/' + params.row.id
                        }} aria-label="edit">
                            <EditIcon/>
                        </IconButton>
                    </Link>

                    <IconButton aria-label="delete">
                        <DeleteIcon/>
                    </IconButton>
                </Stack>)
            }
        },

    ];


    const rows = books.map((book) => ({
        id: book.id,
        coverImageURL: book.coverImageURL,
        title: book.title,
        author: book.author,
        description: book.description,
        owner: book.owner.firstName + " " + book.owner.lastName,
        createdAt: book.createdAt.substring(2, 10),
        updatedAt: book.updatedAt.substring(2, 10)
    }))
    console.log(rows);

    function generateRandom() {
        var length = 8,
            charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
            retVal = "";
        for (var i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal;
    }

    const handleRowClick = (params) => {
        let path = "/book"
        const id = params.row.id;
        setSelectedRow(id);
        // navigateTo(`${path}/${id}`);
        window.location.href = '/book/' + params.row.id;
    };

    return (
        <Box style={{minHeight: 700, width: '100%', }}>
            <Stack sx={{display:"flex", flexDirection: "row", justifyContent: "space-between", py: 3}}>
                <Typography variant="h3">Manage Books</Typography>


                        <Button  sx={{display: "flex", alignSelf: "flexEnd" }} variant="contained"
                                 type="button"
                                 to="/manage/add"
                                 onClick={() => {
                                     window.location.href = window.location.href + '/add';
                                 }}
                        > Add book</Button>

            </Stack>

            <DataGrid sx={{width: '100%'}}
                      getRowId={(rows) => generateRandom()}
                      rows={rows}
                      columns={columns}
                      pageSize={5}
                      rowsPerPageOptions={[5]}
                      onRowClick={handleRowClick}
                      sx={{cursor: 'pointer'}}
            />

        </Box>

    )
}