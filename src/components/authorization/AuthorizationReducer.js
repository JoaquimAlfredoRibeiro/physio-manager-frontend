import AuthorizationActionTypes from "./AuthorizationActionTypes";

const INITIAL_STATE = { isLoginActive: true }

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AuthorizationActionTypes.CHANGE_IS_LOGIN_ACTIVE:
            return { ...state, isLoginActive: action.payload }
        default:
            return state
    }
}