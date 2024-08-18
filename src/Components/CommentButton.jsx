import { 
    ButtonGroup,
    IconButton,
    Button
} from "@mui/material"

import {
    ChatBubbleOutline as CommentIcon
} from "@mui/icons-material"

export default function CommentButton({comment, item}) {
    return (
        <>
            {!comment && (
                <ButtonGroup sx={{ ml: 3 }}>
                    <IconButton size="small">
                        <CommentIcon 
                            fontSize="small"
                            color="info"
                        />
                    </IconButton>
                    <Button
                        sx={{ 
                            color: "text.fade"                            
                        }}
                        variant="text"
                        size="small"
                    >
                        {item.comments.length}
                    </Button>
                </ButtonGroup>
            )}
        </>
    )
}