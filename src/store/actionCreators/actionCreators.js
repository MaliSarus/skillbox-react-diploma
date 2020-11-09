import * as actionTypes from '../actions'


export const addPost = (posts) => {
    return {
        type: actionTypes.ADD_POSTS,
        posts
    }
}

export const clearPosts = () => {
    return {
        type: actionTypes.CLEAR_POSTS,
    }
}

export const checkAuthSync = (val) => {
    return {
        type: actionTypes.CHECK_AUTH,
        val
    }
}

export const saveDetailPost = (post) => {
    return {
        type: actionTypes.SAVE_DETAIL_POST,
        post
    }
}
