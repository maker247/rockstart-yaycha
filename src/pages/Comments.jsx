import {
    Alert,
    Box,
    Button,
    TextField
} from "@mui/material"

import {
    useNavigate,
    useParams
} from "react-router-dom"

import { useQuery } from "react-query"

import { 
    queryClient,
    useApp
} from "../ThemeApp"

import { useRef } from "react"

import Item from "../Components/Item"
import { useMutation } from "react-query"
import { deleteComment, postComment } from "../libs/fetcher"

const api = import.meta.env.VITE_API

export default function Comments() {
    const {id} = useParams()

    const navigate = useNavigate()

    const {setGlobalMsg} = useApp()

    const contentInput = useRef()

    const {
        isLoading,
        isError,
        error,
        data
    } = useQuery(
        "comments",
        async () => {
            const res = await fetch(`${api}/content/posts/${id}`, {method: "GET"})

            return res.json()
        }
    )

    const removePost = useMutation(async id => {
        await fetch(`${api}/content/posts/${id}`, {
            method: "DELETE"
        })

        navigate("/")

        setGlobalMsg("A post deleted")
    })

    const removeComment = useMutation(
        async cmtId => deleteComment(cmtId),
        {
            onMutate: id => {
                queryClient.cancelQueries("comments")
                queryClient.setQueryData("comments", old => {
                    old.comments = old.comments.filter(
                        comment => comment.id !== id
                    )

                    return {...old}
                })

                setGlobalMsg("A comment deleted")
            }
        }
    )

    const addComment = useMutation(async content => postComment(content, id), {
        onSuccess: async comment => {
            await queryClient.cancelQueries("comments")

            await queryClient.setQueryData("comments", old => {
                old.comments = [...old.comments, comment]

                return {...old}
            })

            setGlobalMsg("a comment added")
        }
    })

    if(isError) {
        return (
            <Box>
                <Alert severity="warning">{error.message}</Alert>
            </Box>
        )
    }

    if(isLoading) {
        return <Box sx={{ textAlign: "center" }}>Loading...</Box>
    }

    return (
        <Box>
            <Item 
                primary
                item={data}
                remove={removePost.mutate}
            />

            {data?.comments?.map(comment => (
                <Box key={comment.id}>
                    <Item 
                        comment
                        item={comment}
                        remove={() => removeComment.mutate(comment.id)}
                    />
                </Box>
            ))}

            <form
                onSubmit={e => {
                    e.preventDefault()

                    const content = contentInput.current.value

                    if(! content) return false

                    addComment.mutate(content, data.id)

                    e.currentTarget.reset()
                }}
            >
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    mt: 3
                }}>
                    <TextField 
                        multiline 
                        inputRef={contentInput}
                        placeholder="Your Comment" 
                    />

                    <Button type="submit" variant="contained">Reply</Button>
                </Box>
            </form>

        </Box>
    )
}