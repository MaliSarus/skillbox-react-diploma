import * as actionTypes from '../actions'
import {checkAuth, unsplash} from "../../unsplash";
import {toJson} from "unsplash-js/lib/unsplash";

export const getPosts = (page) => {
    return async (dispatch, getState) => {
        const result = await new Promise((resolve, reject) => resolve(dispatch(checkAuthAsync())))
        console.log(result)
    }

}
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

export const checkAuthAsync = () => {
    let lsToken = localStorage.getItem('token');
    let expirationDate = localStorage.getItem('tokenExpiration');
    if (lsToken) {
        if (new Date().getTime() > +expirationDate) {
            localStorage.removeItem('token');
            localStorage.removeItem(('tokenExpiration'))
            lsToken = undefined;
            expirationDate = undefined;
        } else {
            return dispatch => {
                unsplash.auth.setBearerToken(localStorage.getItem('token'));
                unsplash.currentUser.profile()
                    .then(toJson)
                    .then(data => {
                        dispatch(checkAuthSync(data.username))
                    });

            }
        }
    }
    if (!lsToken) {
        const token = checkAuth();
        if (token) {
            return dispatch => {
                unsplash.auth.userAuthentication(token)
                    .then(toJson)
                    .then(json => {
                        unsplash.auth.setBearerToken(json.access_token);
                        localStorage.setItem('token', json.access_token);
                        localStorage.setItem('tokenExpiration', new Date().getTime() + 100000);
                        unsplash.currentUser.profile()
                            .then(toJson)
                            .then(data => {
                                dispatch(checkAuthSync(data.username))
                            });

                    });
            }
        } else {
            return dispatch => {
                dispatch(checkAuthSync(false))
            }
        }
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
