const api = import.meta.env.VITE_API

export async function fetchNotis() {
    const token = getToken()

    const res = await fetch(`${api}/content/notis`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return res.json()
}

export async function putAllNotisRead() {
    const token = getToken()

    const res = await fetch(`${api}/content/notis/read`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return res.json()
}

export async function putNotiRead(id) {
    const token = getToken()

    const res = await fetch(`${api}/content/notis/read/${id}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return res.json()
}

export async function fetchPosts() {

    const res = await fetch(`${api}/content/posts`)

    return res.json()
}

export async function fetchFollowingPosts() {
    const token = getToken()

    const res = await fetch(`${api}/content/following/posts`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return res.json()
}

export async function fetchSearch(q) {
    const res = await fetch(`${api}/search?q=${q}`)

    return res.json()
}

export async function postFollow(id) {
    const token = getToken()

    const res = await fetch(`${api}/follow/${id}`, resDTO({
        headers: {
            Authorization: `Bearer ${token}`
        }
    }))

    return res.json()
}

export async function deleteFollow(id) {
    const token = getToken()

    const res = await fetch(`${api}/unfollow/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    res.json()
}

export async function postPostLike(id) {
    const token = getToken()

    const res = await fetch(`${api}/content/like/posts/${id}`, resDTO({
        headers: {
            Authorization: `Bearer ${token}`
        }
    }))

    return res.json()
}

export async function postCommentLike(id) {
    const token = getToken()

    const res = await fetch(`${api}/content/like/comments/${id}`, resDTO({
        headers: {
            Authorization:  `Bearer ${token}`
        }
    }))

    return res.json()
}

export async function deletePostLike(id) {  
    const token = getToken()

    const res = await fetch(`${api}/content/unlike/posts/${id}`, resDTO({
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    }))

    return res.json()
}

export async function deleteCommentLike(id) {
    const token = getToken()

    const res = await fetch(`${api}/content/unlike/comments/${id}`, resDTO({
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    }))

    return res.json()
}

export async function fetchPostLikes(id) {
    const res = await fetch(`${api}/content/like/posts/${id}`)

    return res.json()
}

export async function fetchCommentLikes(id) {
    const res = await fetch(`${api}/content/like/comments/${id}`)

    return res.json()
}

export async function fetchUser(id) {
    const token = getToken()

    const res = await fetch(`${api}/users/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return res.json()
}

const getToken = () => localStorage.getItem("token")

export async function fetchVerify() {
    const token = getToken()

    const res = await fetch(`${api}/verify`, resDTO({
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    }))

    if(res.ok) return res.json(res)

    return false
}

export async function postUser(data) {
    try {
        const res = await fetch(`${api}/users`, resDTO({body: data}))

        if (! res.ok) {
            throw new Error(res.msg || "Failed to create user")
        }

        return res.json()

    } catch (e) {

        throw e

    }
}

export async function deleteComment(id) {
    const token = getToken()

    const res = await fetch(`${api}/content/comments/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })

    if(res.ok) return res.json()

    throw new Error("Error: Check network log")
}

export async function postPost(content) {
    const token = getToken()

    const res = await fetch(`${api}/content/posts`, resDTO({
        body: {content},
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }))

    if(res.ok) return res.json()

    throw new Error("Error: Check Network log")
}

export async function postComment(content, postId) {
    const token = getToken()

    const res = await fetch(`${api}/content/comments`, resDTO({
        body: {content, postId},
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        } 
    }))

    if(res.ok) return res.json()

    throw new Error("Error: Check Network log")
}

export async function postLogin(username, password) {
    const res = await fetch(`${api}/login`, resDTO({
        body: {username, password}
    }))

    if(res.ok) {
        return res.json()
    }

    throw new Error("Incorrect username and password")
}

function resDTO({
    method = "POST",
    body,
    headers = {"Content-Type": "application/json"}
}) {

    return {
        method,
        body: JSON.stringify(body),
        headers
    }
}