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

import {
    useMutation
} from "react-query"

import { useNavigate } from "react-router-dom"

import { useApp } from "../ThemeApp"

import {
    postUser
} from "../libs/fetcher"

export default function Register() {
    const {setGlobalMsg} = useApp()

    const nameInput = useRef()

    const usernameInput = useRef()

    const bioInput = useRef()

    const passwordInput = useRef()

    const [error, setError] = useState("")

    const navigate = useNavigate()

    const { setAuth } = useApp()

    const handleSubmit = e => {

        e.preventDefault()

        const name = nameInput.current.value

        const username = usernameInput.current.value

        const bio = bioInput.current.value

        const password = passwordInput.current.value

        if(!name || !username || !password) {
            setError("name, username, password required.")

            return false
        }

        create.mutate({
            name,
            username,
            bio,
            password
        })
    }

    const create = useMutation(async data => postUser(data), {
        onError: async () => {
            setError("Cannot create Account.")
        },
        OnSuccess: async user => {
            setGlobalMsg("Acount Created.")

            navigate("/login")
        }
    })

    return (
        <Box>
            <Typography variant="h3">
                Register
            </Typography>

            {error && (<Alert severity="warning" sx={{ my: 2 }}>{error}</Alert>)}

            <form onSubmit={handleSubmit}>
                <Box>
                    <TextField 
                        placeholder="Name" 
                        sx={{ mb: 2 }} 
                        inputRef={nameInput}
                        fullWidth 
                    />

                    <TextField 
                        placeholder="Username"
                        sx={{ mb: 2 }} 
                        inputRef={usernameInput}
                        fullWidth 
                    />

                    <TextField 
                        placeholder="Bio"
                        sx={{ mb: 2 }} 
                        inputRef={bioInput}
                        fullWidth 
                    />

                    <TextField 
                        placeholder="Password"
                        type="password" sx={{ mb: 2 }} 
                        inputRef={passwordInput}
                        fullWidth 
                    />

                    <Button type="submit" variant="contained" fullWidth>
                        Register
                    </Button>
                </Box>
            </form>
        </Box>
    )
}