import * as actionTypes from '../actions'
import {checkAuth} from "../../unsplash";

export const addPost = (posts) =>{
    return{
        type: actionTypes.ADD_POSTS,
        posts
    }
}

export const checkAuthAsync = () =>{
    const isAuth = checkAuth();
    return dispatch => {
        if(isAuth){
            dispatch(checkAuthSync(true))
        }
        else{
            dispatch(checkAuthSync(false))

        }
    }
}

export const checkAuthSync = (val) =>{
    return{
        type: actionTypes.CHECK_AUTH,
        val
    }
}
