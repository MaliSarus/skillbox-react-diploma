import * as actionTypes from '../actions'
import {checkAuth} from "../../unsplash";

export const addPost = (posts) => {
    return {
        type: actionTypes.ADD_POSTS,
        posts
    }
}

export const checkAuthAsync = () => {
    let isAuth = false;
    checkAuth(isAuth);
    // console.log('isAuth:',isAuth);

    return dispatch => {
        dispatch(checkAuthSync(isAuth))
    }
}

export const checkAuthSync = (val) => {
    return {
        type: actionTypes.CHECK_AUTH,
        val
    }
}
