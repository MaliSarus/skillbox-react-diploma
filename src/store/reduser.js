
import * as actionType from './actions'
const initialState = {
    posts: [],
    isAuth: false
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
            return {
                ...state,
                isAuth: action.val,
            }
        default:
            return state;
    }
}

export default reducer;