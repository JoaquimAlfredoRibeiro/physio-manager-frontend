import AuthorizationActionTypes from "./AuthorizationActionTypes";
import { toastr } from 'react-redux-toastr'

import appConsts from '../../appConstants'

export function changeIsLoginActive(active) {
    return { type: AuthorizationActionTypes.CHANGE_IS_LOGIN_ACTIVE, payload: active }
}
