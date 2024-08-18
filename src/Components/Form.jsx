import { 
    useRef
} from "react"

import {
    Box,
    TextField,
    Button
} from "@mui/material"
import { useApp } from "../ThemeApp";

const Form = ({add}) => {

    const { mode } = useApp();

    const contentRef = useRef()

    const nameRef = useRef()

    return (
        <form
            onSubmit={e => {
                e.preventDefault()

                const content = contentRef.current.value
                
                const name = nameRef.current.value

                add(content, name)

                e.currentTarget.reset()
            }}
        >
            <Box sx={{ mb: 1, textAlign: 'right' }}>
                <TextField 
                    inputRef={contentRef}
                    type="text"
                    placeholder="Content"
                    fullWidth
                    multiline
                    sx={{ mb: 1 }}
                />
                <TextField 
                    inputRef={nameRef}
                    type="text"
                    placeholder="Name"
                    fullWidth
                    multiline
                    sx={{ mb: 1 }}
                />

                <Button 
                    sx={{
                        textAlign: "right"
                    }}
                    variant="contained"
                    type="submit"
                >
                    Post
                </Button>
            </Box>
        </form>
    )
}

export default Form