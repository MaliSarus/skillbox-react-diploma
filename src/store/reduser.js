
import * as actionType from './actions'
const initialState = {
    posts: [],
    // authUrl: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.ADD_POSTS:
            const oldPosts = [...state.posts];
            const updatedPosts = oldPosts.concat(action.posts)
            return {
                posts: updatedPosts
            }
        default:
            return state;
    }
}

export default reducer;