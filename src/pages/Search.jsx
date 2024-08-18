import {
    Alert,
    Avatar,
    Box,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemSecondaryAction,
    ListItemText,
    TextField
} from "@mui/material"

import { 
    useState
} from "react"

import {
    useQuery
} from "react-query"

import { fetchSearch } from "../libs/fetcher"

import FollowButton from "../Components/FollowButton"

import { useDebounce } from "@uidotdev/usehooks"

import { useNavigate } from "react-router-dom"

export default function Search() {
    const [query, setQuery] = useState("")

    const navigate = useNavigate()

    const debounceQuery = useDebounce(query, 500)

    const {
        isLoading,
        isError,
        error,
        data
    } = useQuery(
        ["search", debounceQuery],
        () => {
            return fetchSearch(debounceQuery)
        }
    )

    if(isError) {
        return (
            <Box>
                <Alert severity="warning">{error.message}</Alert>
            </Box>
        )
    }

    return (
        <Box>
            <TextField 
                fullWidth={true}
                variant="outlined"
                placehoder="Search user"
                onKeyUp={e => {
                    setQuery(e.target.value)
                }}
            />
            
            {isLoading ? 
                (
                    <Box sx={{ textAlign: 'center', mt: 4 }}>Loading...</Box>
                ) : (
                    <List>
                        {data.map(user => {
                            return (
                                <ListItem key={user.id}>
                                    <ListItemButton
                                        onClick={() => {
                                            navigate(`/profile/${user.id}`)
                                        }}
                                    >
                                        <ListItemAvatar>
                                            <Avatar />
                                        </ListItemAvatar>
                                        <ListItemText 
                                            primary={user.name} 
                                            secondary={user.bio}
                                        />
                                        <ListItemSecondaryAction>
                                            <FollowButton
                                                user={user}
                                            />
                                        </ListItemSecondaryAction>
                                    </ListItemButton>
                                </ListItem>
                            )
                        })}
                    </List>
                )
            }
        </Box>
    )
}



