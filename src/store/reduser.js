import * as actionType from './actions'

const initialState = {
    posts: [],
    // authUrl: null
}

const getVisibleTodos = (state = initialState, action) => {
    switch (action.type) {
        case actionType.SET_AUTH_URL:
            // return {
            //     ...state,
            //     authUrl: action.url
            // }
        default:
            return state;
    }
}