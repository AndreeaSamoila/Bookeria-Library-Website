import React, {useContext} from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import BookIcon from "@mui/icons-material/Book";
import { useAuthContext } from "../contexts/auth/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import { ThemeContext } from "../contexts/theme/ThemeContext";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import {palette} from "../theme/index.jsx";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MenuBookIcon from '@mui/icons-material/MenuBook';

const pages = [
    {
        name: "Home",
        path: "/",
    },
    {
        name: "Manage Books",
        path: "/manage",
        auth: true,
    },
];

export function Header() {
    const { user, logout } = useAuthContext();
    const {toggleMode } = useContext(ThemeContext)
    const navigate = useNavigate();

    console.log(user);

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <MenuBookIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component={NavLink}
                        to="/"
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        Bookeria
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuBookIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            {pages
                                .filter((page) => (page.auth ? Boolean(user) : true))
                                .map((page) => (
                                    <MenuItem
                                        component={NavLink}
                                        to={page.path}
                                        key={page.name}
                                        onClick={handleCloseNavMenu}
                                        sx={{
                                            "&.active": {
                                                "& p": {
                                                    color: "text.primary",
                                                    fontWeight: "bold",
                                                },
                                                backgroundColor: "action.selected",
                                            },
                                        }}
                                    >
                                        <Typography textAlign="center">{page.name}</Typography>
                                    </MenuItem>
                                ))}
                        </Menu>
                    </Box>
                    <MenuBookIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component={NavLink}
                        to="/"
                        sx={{
                            mr: 2,
                            display: { xs: "flex", md: "none" },
                            flexGrow: 1,
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        Library
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                        {pages
                            .filter((page) => (page.auth ? Boolean(user) : true))
                            .map((page) => (
                                <Button
                                    key={page.name}
                                    LinkComponent={NavLink}
                                    to={page.path}
                                    onClick={handleCloseNavMenu}
                                    sx={{
                                        my: 2,
                                        color: "white",
                                        display: "block",
                                        "&.active": {
                                            color: "text.primary",
                                            fontWeight: "bold",
                                            backgroundColor: "action.selected",
                                        },
                                    }}
                                >
                                    {page.name}
                                </Button>
                            ))}
                    </Box>
                    <Box sx={{ mx: 1}}>
                        {user ? <IconButton  onClick={handleCloseNavMenu}  LinkComponent={NavLink}  to={"/favoriteBooks"}  variant="contained"
                                             sx={{
                                                 color: "white",
                                             }}><FavoriteBorderIcon/></IconButton> : ""}

                    </Box>
                    <Box>

                        <Tooltip title="Account">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                {user ? (
                                    <Avatar>
                                        {user.firstName[0]}
                                        {user.lastName[0]}
                                    </Avatar>
                                ) : (
                                    <Avatar />
                                )}
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {user ? (
                                <MenuItem
                                    onClick={() => {
                                        logout();
                                    }}
                                >
                                    <Typography textAlign="center">Logout</Typography>
                                </MenuItem>
                            ) : (
                                <MenuItem
                                    onClick={() => {
                                        navigate("/login");
                                    }}
                                >
                                    <Typography textAlign="center">Login</Typography>
                                </MenuItem>
                            )}

                            {/* {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))} */}
                        </Menu>
                        {/*<IconButton onClick={toggleMode} color="inherit">Toggle Mode</IconButton>*/}
                        {/*{theme.palette.mode} mode*/}
                        <IconButton sx={{ ml: 1 }} onClick={toggleMode} color="inherit">
                            {palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                        </IconButton>


                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}