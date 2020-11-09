import * as actionType from './actions'

const initialState = {
    posts: [],
    authUser: null,
    detailPost: null,
    // authUrl: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.ADD_POSTS:
            const oldPosts = [...state.posts];
            const updatedPosts = oldPosts.concat(action.posts);
            return {
                ...state,
                posts: updatedPosts
            }
        case actionType.CLEAR_POSTS:
            return {
                ...state,
                posts: []
            }
        case actionType.CHECK_AUTH:
            let auth = action.val ? action.val : null;
            return {
                ...state,
                authUser: auth,
            }
        case actionType.SAVE_DETAIL_POST:
            const detailPost = {...action.post};
            return {
                ...state,
                detailPost
            }
        default:
            return state;
    }
}

export default reducer;