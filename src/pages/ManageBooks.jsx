import {Box, Button, CircularProgress, Stack, Typography} from "@mui/material";
import * as React from 'react';
import {DataGrid} from '@mui/x-data-grid';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import {useFetchData} from "../hooks/useFetchData.js";
import {deleteBook,getMyBooks, } from "../services/book.js";
import {useNavigate, } from "react-router-dom";
import {useState} from "react";
import { useTheme } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import {toast} from "react-toastify";

export default function () {

    const navigateTo = useNavigate();

    const {data: books, loading, error, refetch} = useFetchData({
        fetcher: getMyBooks,
        initialData: [],
    })
    const [deletedId, setDeletedId] = useState("");
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setDeletedId("");
    };
    const showToastMessage = () => {
        toast.success('The book was deleted successfully!', {
            position: toast.POSITION.TOP_RIGHT
        });
    };

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
                        <IconButton onClick={(event) => {
                            event.stopPropagation();
                            navigateTo("/manage/edit/" + params.row.id);
                        }} aria-label="edit">
                            <EditIcon/>
                        </IconButton>
                    <IconButton aria-label="delete" onClick={(event) => {
                        event.stopPropagation();
                        handleClickOpen();
                        setDeletedId(params.row.id)
                    }} ><DeleteIcon/>
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

    const handleDeleteBook = async (id) => {

        const response = await deleteBook(id)
            .then(() => {
                refetch();
            })
        navigateTo('/manage');
        showToastMessage();
    }

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
        const id = params.row.id;
        navigateTo(`/book/${id}`);
    };

    return (
        <Box style={{minHeight: 700, width: '100%', }}>
            <Stack sx={{display:"flex", flexDirection: "row", justifyContent: "space-between", py: 3}}>
                <Typography variant="h3">Manage Books</Typography>

                        <Button  sx={{display: "flex", alignSelf: "flexEnd" }} variant="contained"
                                 type="button"
                                 to="/manage/add"
                                 onClick={() => {
                                     navigateTo(`/manage/add`);
                                 }}
                        > Add book</Button>

            </Stack>
            <DataGrid
                      getRowId={(rows) => generateRandom()}
                      rows={rows}
                      columns={columns}
                      pageSize={5}
                      rowsPerPageOptions={[5]}
                      onRowClick={handleRowClick}
                      sx={{cursor: 'pointer', width: '100%'}}
            />
                <Dialog
                    fullScreen={fullScreen}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title">
                    <DialogTitle id="responsive-dialog-title">
                        {"Confirmation!"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to delete this item? This process cannot be undone!
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button
                            onClick={() => {
                                handleClose()
                                handleDeleteBook(deletedId)}}
                            autoFocus>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
        </Box>
    )
}