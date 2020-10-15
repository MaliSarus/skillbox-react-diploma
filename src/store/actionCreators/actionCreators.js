import * as actionTypes from '../actions'
import {checkAuth, unsplash} from "../../unsplash";
import {toJson} from "unsplash-js/lib/unsplash";

export const addPost = (posts) => {
    return {
        type: actionTypes.ADD_POSTS,
        posts
    }
}

export const checkAuthAsync = () => {
    const token = checkAuth();
    if (token){
        return dispatch => {
            unsplash.auth.userAuthentication(token)
                .then(toJson)
                .then(json => {
                    unsplash.auth.setBearerToken(json.access_token);
                    dispatch(checkAuthSync(true))
                });
        }
    }
    else{
        return dispatch => {
            dispatch(checkAuthSync(false))
        }
    }
}

export const checkAuthSync = (val) => {
    return {
        type: actionTypes.CHECK_AUTH,
        val
    }
}
