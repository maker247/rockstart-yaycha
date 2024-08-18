import { 
    createContext,
    useContext,
    useState,
    useMemo,
    useEffect
} from "react"

import { RouterProvider, createBrowserRouter } from "react-router-dom"

import {
    QueryClient,
    QueryClientProvider
} from "react-query"

import {
    CssBaseline,
    ThemeProvider,
    createTheme
} from "@mui/material"

import { 
    deepPurple,
    grey
} from "@mui/material/colors"

import Template from "./Template"

import Home from "./pages/Home"

import Login from "./pages/Login"

import Register from "./pages/Register"

import Profile from "./pages/Profile"

import Comments from "./pages/Comments"

import Likes from "./pages/Likes"

import { fetchVerify } from "./libs/fetcher"

import Search from "./pages/Search"

import Notis from "./pages/Notis"

import AppSocket from "./AppSocket"

export const AppContext = createContext()

export function useApp () {
    return useContext(AppContext);
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <Template />,
        children: [
            {
                path: "/",
                loader: async () => {
                    const res = await fetch("http://localhost:8000/info")

                    if(!res.ok) {
                        throw new Error("Failed to fetch info api!")
                    }

                    const info = await res.json()

                    return {info}
                },
                element: <Home />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/profile/:id",
                element: <Profile />
            },
            {
                path: "/comments/:id",
                element: <Comments />
            },
            {
                path: "/likes/:id/:type",
                element: <Likes />
            },
            {
                path: "/search",
                element: <Search />
            },
            {
                path: "/notis",
                element: <Notis />
            }
        ]
    }
])

export const queryClient = new QueryClient()

export default function ThemeApp() {
    const [showDrawer, setShowDrawer] = useState(false)
    const [auth, setAuth] = useState(false)
    const [globalMsg, setGlobalMsg] = useState(null)
    const [showForm, setShowForm] = useState(false);
    const [mode, setMode] = useState("dark");

    useEffect(() => {
        fetchVerify()
            .then(user => {
                if(user) setAuth(user)
            })
    }, [])

    const theme = useMemo(() => {
        return createTheme({
            palette: {
                mode,
                primary: deepPurple,
                banner: mode === "dark" ? grey[800] : grey[200],
                text: {
                    fade: grey[500]
                }
            },
        })
    }, [mode]);

    return (
        <ThemeProvider theme={theme}>
            <AppContext.Provider
                value={{ 
                    showDrawer,
                    setShowDrawer,
                    globalMsg,
                    setGlobalMsg,
                    auth,
                    setAuth,
                    showForm,
                    setShowForm,
                    mode,
                    setMode
                }} 
            >
                <QueryClientProvider client={queryClient}>
                    <RouterProvider router={router} />
                    <AppSocket/>
                </QueryClientProvider>
                <CssBaseline />
            </AppContext.Provider>
        </ThemeProvider>
    )
}