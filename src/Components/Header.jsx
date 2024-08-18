import { useNavigate } from "react-router-dom"

import { useQuery } from "react-query"

import {
    Box,
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Badge
} from '@mui/material'

import {
    Menu as MenuIcon,
    Add as AddIcon,
    LightMode as LightModeIcon,
    DarkMode as DarkModeIcon,
    SearchRounded as SearchIcon,
    Notifications as NotiIcon
} from '@mui/icons-material'

import { useApp } from "../ThemeApp"

import { fetchNotis } from "../libs/fetcher"

export default function Header() {
    const {showForm, setShowForm, showDrawer, setShowDrawer, mode, setMode, auth} = useApp()

    const navigate = useNavigate()

    const {
        isLoading,
        isError,
        error,
        data
    } = useQuery(["notis", auth], fetchNotis)

    function notiCount() {
        if(! auth) return 0

        if(isLoading || isError) return 0

        return data.filter(noti => !noti.read).length
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    onClick={() => setShowDrawer(! showDrawer)}
                    color="inherit"
                    edge="start"
                >
                    <MenuIcon></MenuIcon>
                </IconButton>

                <Typography sx={{ 
                    flexGrow: 1, 
                    ml: 2
                }}>
                    Yaycha
                </Typography>

                <Box>
                    <IconButton
                        color="inherit"
                        onClick={() => navigate('/search')}
                    >
                        <SearchIcon />
                    </IconButton>

                    <IconButton
                        color="inherit"
                        onClick={() => navigate('/notis')}
                    >
                        <Badge
                            color="error"
                            badgeContent={notiCount()}
                        >
                            <NotiIcon />
                        </Badge>
                    </IconButton>

                    <IconButton
                        color="inherit"
                        onClick={() => setShowForm(!showForm)}
                    >
                        <AddIcon />
                    </IconButton>
                    
                    {mode === "dark" ? (
                        <IconButton
                            color="inherit"
                            edge="end"
                            onClick={() => setMode("light")}
                        >
                            <LightModeIcon />
                        </IconButton>
                    )
                    :(
                        <IconButton
                            color="inherit"
                            edge="end"
                            onClick={() => setMode("dark")}
                        >
                            <DarkModeIcon />
                        </IconButton>    
                    )
                    }
                </Box>

            </Toolbar>
        </AppBar>

    )
}