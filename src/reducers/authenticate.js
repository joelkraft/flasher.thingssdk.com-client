import * as auth from '../actiontypes/authenticate'

export default ( 
    state = {
        items: [],
        submitted: null,
        isFetching: false
    }, 
    action 
) => {
    switch (action.type) {
        case auth.REQUEST_AUTH:
            return {
                ...state, 
                isFetching: true
            }
        // TODO this should be called SET_AUTH_TOKEN, these two actions should be split
        case auth.RECEIVE_AUTH:
            return {
                ...state,
                isFetching: false,
                token: action.token,
                authenticated: true
            }
        case auth.CLEAR_AUTH:
            return {
                ...state,
                token: null,
                authenticated: false
            }
        case auth.DISPLAY_ERROR:
            return {
                ...state,
                flash: action.flash
            }
         default:
            return state
    }
}
