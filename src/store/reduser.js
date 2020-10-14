import * as actionType from './actions'

const initialState = {
    posts: [],
    isAuth: null
    // authUrl: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.ADD_POSTS:
            const oldPosts = [...state.posts];
            const updatedPosts = oldPosts.concat(action.posts)
            return {
                ...state,
                posts: updatedPosts
            }
        case actionType.CHECK_AUTH:

            let auth = action.val ? {...action.val} : null
            return {
                ...state,
                isAuth: auth,
            }
        default:
            return state;
    }
}

export default reducer;