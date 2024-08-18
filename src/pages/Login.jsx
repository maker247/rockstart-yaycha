import {
    Alert,
    Box,
    Button,
    TextField,
    Typography
} from "@mui/material"

import { 
    useRef,
    useState
} from "react"

import { useNavigate } from "react-router-dom"

import { useMutation } from "react-query"

import { useApp } from "../ThemeApp"

import { postLogin } from "../libs/fetcher"

export default function Login() {
    const navigate = useNavigate()

    const [error, setError] = useState()

    const usernameInput = useRef()

    const passwordInput = useRef()

    const { setAuth } = useApp()

    const handleSubmit = e => {
        e.preventDefault()

        const username = usernameInput.current.value

        const password = passwordInput.current.value

        if(!username || !password) {
            setError("username, password required")

            return false
        }

        login.mutate({username, password})
        
    }

    const login = useMutation(
        async ({username, password}) => postLogin(username, password),
        {
            onError: async () => {
                setError("Incorrect username or password")
            },
            onSuccess: async result => {
                setAuth(result.user)

                localStorage.setItem("token", result.token)

                navigate("/")
            }
        }
    )

    return (
        <Box>
            <Typography variant="h3">
                Login
            </Typography>

            {error && <Alert severity="warning" sx={{ my: 2 }}>{error}</Alert>}

            <form onSubmit={handleSubmit}>
                <Box>
                    <TextField 
                        placeholder="Username" 
                        sx={{ mb: 2 }} 
                        inputRef={usernameInput}
                        fullWidth 
                    />

                    <TextField 
                        placeholder="Password" 
                        type="password" 
                        sx={{ mb: 2 }} 
                        inputRef={passwordInput}
                        fullWidth />

                    <Button type="submit" variant="contained" fullWidth>
                        Login
                    </Button>
                </Box>
            </form>
        </Box>
    )
}