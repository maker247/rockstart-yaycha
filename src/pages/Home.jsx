import {
    Box,
    Alert,
    Button,
    Typography
} from "@mui/material"

import { 
    useQuery,
    useMutation
} from "react-query"

import { useState } from "react"

import {queryClient} from "../ThemeApp"

import Item from "../Components/Item"

import Form from "../Components/Form"

import { useApp } from "../ThemeApp"

import { 
    postPost,
    fetchFollowingPosts,
    fetchPosts
} from "../libs/fetcher"

const api = import.meta.env.VITE_API;

const Home = () => {

    const { showForm, globalMsg, setGlobalMsg, auth } = useApp()

    const [showLatest, setShowLatest] = useState(true)

    const {
        isLoading,
        isError,
        error,
        data
    } = useQuery(["posts", showLatest], async () => {
        if(showLatest) return fetchPosts()
        else return fetchFollowingPosts()
    })

    const remove = useMutation(
        async id => {
            await fetch(`${api}/content/posts/${id}`, {
                method: "DELETE"
            })
        },
        {
            onMutate: id => {
                queryClient.cancelQueries("posts")
                queryClient.setQueryData(["posts", showLatest], old => old.filter(item => item.id !== id))
                setGlobalMsg("An item deleted.")
            }
        }
    )

    const add = useMutation(async content => postPost(content), {
        onSuccess: async post => {
            await queryClient.cancelQueries("posts")

            await queryClient.setQueryData(["posts", showLatest], old => [post, ...old])

            setGlobalMsg("A post added.")
        }
    })

    if(isError) {
        return (
            <Box>
                <Alert severity="warning">Cannot Fetch Data</Alert>
            </Box>
        )
    }

    if(isLoading) {
        return <Box sx={{ textAlign: "center" }}>Loading ...</Box>
    }

    return (
        <>
            {showForm  && auth && <Form add={add.mutate} /> } 

            <Box sx={{
                my: 3
            }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        mb: 1,
                    }}
                >
                    <Button
                        disabled={showLatest}
                        onClick={() => setShowLatest(true)}
                    >
                        Latest
                    </Button>

                    <Typography sx={{ color: "text.fade", fontSize: 15 }}>
                        |
                    </Typography>

                    <Button
                        disabled={!showLatest}
                        onClick={() => setShowLatest(false)}
                    >
                        Following
                    </Button>
                </Box>

                {data.map((item) => 
                    <Item
                        key={item.id}
                        item={item}
                        remove={remove.mutate}
                    ></Item>
                )}
            </Box>
        </>
    )
}

export default Home