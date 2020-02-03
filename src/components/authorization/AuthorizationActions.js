import AuthorizationActionTypes from "./AuthorizationActionTypes";

export function changeIsLoginActive(active) {
    return { type: AuthorizationActionTypes.CHANGE_IS_LOGIN_ACTIVE, payload: active }
}