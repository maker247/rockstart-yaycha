import {
    Button
} from "@mui/material"

import { useMutation } from "react-query"

import {
    useApp,
    queryClient
} from "../ThemeApp"

import {
    postFollow,
    deleteFollow
} from "../libs/fetcher"

export default function FollowButton({user}) {
    const {auth} = useApp()

    if(! auth) return false

    function isFollowing() {
        return user.following.find(item => item.followerId == auth.id)
    }

    const follow = useMutation(
        id => postFollow(id),
        {
            onSuccess: async () => {
                await queryClient.refetchQueries("users")
                await queryClient.refetchQueries("user")
                await queryClient.refetchQueries("search")
            }
        }
    )

    const unfollow = useMutation(
        id => deleteFollow(id),
        {
            onSuccess: async () => {
                await queryClient.refetchQueries("users")
                await queryClient.refetchQueries("user")
                await queryClient.refetchQueries("search")
            }
        }
    )

    return auth.id == user.id ? (
        <></>
    ): (
        <Button
            size="small"
            edge="end"
            variant={isFollowing() ? "outLined" : "contained"}
            sx={{ borderRadius: 5 }}
            onClick={e => {
                if(isFollowing()) {
                    unfollow.mutate(user.id)
                } else {
                    follow.mutate(user.id)
                }

                e.stopPropagation()
            }}
        >
            {isFollowing() ? "Following" : "Follow"}
        </Button>
    )
}