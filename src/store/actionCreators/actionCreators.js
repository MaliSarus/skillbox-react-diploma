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
    console.log(token);
    if (token){
        return dispatch => {
            unsplash.auth.userAuthentication(token)
                .then(toJson)
                .then(json => {
                    unsplash.auth.setBearerToken(json.access_token);
                    unsplash.currentUser.profile()
                        .then(toJson)
                        .then(data => {
                            dispatch(checkAuthSync(data.username))
                        });

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
