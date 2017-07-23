import * as auth from "../actiontypes/user";

export default (
    state = {
        info: { isAdmin: false },
        isFetching: false
    },
    action
) => {
    switch (action.type) {
        case auth.REQUEST_USER_INFO:
            return {
                ...state,
                isFetching: true
            };
        case auth.RECEIVE_USER_INFO:
            return {
                ...state,
                isFetching: false,
                info: action.info
            };
        case auth.CLEAR_USER_INFO:
            return {
                ...state,
                info: null
            };
        case auth.REQUEST_SET_USER_INFO:
            return {
                ...state,
                isSetting: true
            };
        case auth.USER_INFO_IS_SET:
            return {
                ...state,
                isSetting: false,
                info: action.info
            };
        case auth.DISPLAY_ERROR:
            return {
                ...state,
                flash: action.flash
            };
        default:
            return state;
    }
};
