import {
    Box,
    Alert
} from "@mui/material"

import UserList from "../Components/UserList"

import { useParams } from "react-router-dom"

import { useQuery } from "react-query"
import { fetchCommentLikes, fetchPostLikes } from "../libs/fetcher"

export default function Likes() {
    const {id, type} = useParams()

    const {
        isLoading,
        isError,
        error,
        data
    } = useQuery(
        ["users", id, type],
        () => {
            if(type == "comment") {
                return fetchCommentLikes(id)
            } else {
                return fetchPostLikes(id)
            }
        }
    )

    if(isError) {
        return (
            <Box>
                <Alert severity="warning">{error.message}</Alert>
            </Box>
        )
    }

    if(isLoading) {
        return (
            <Box sx={{ textAlign: "center" }}>Loading...</Box>
        )
    }

    return <Box>
        <UserList title="Likes" data={data} />
    </Box>
}