import AppointmentsActionTypes from "./AppointmentsActionTypes";

const INITIAL_STATE = { appointmentsList: [] }

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AppointmentsActionTypes.GET_ALL_APPOINTMENTS:
            return {
                ...state,
                appointmentsList: action.payload.data.consultations
            }
        case AppointmentsActionTypes.CREATE_APPOINTMENT:
            return {
                ...state
            }
        // case PathologiesActionTypes.UPDATE_PATHOLOGY:
        //     return {
        //         ...state,
        //         showPathologyDialog: false
        //     }
        // case PathologiesActionTypes.DELETE_PATHOLOGY:
        //     return {
        //         ...state
        //     }
        // case PathologiesActionTypes.SET_SHOW_PATHOLOGY_DIALOG:
        //     return {
        //         ...state,
        //         showPathologyDialog: action.payload
        //     }
        // case PathologiesActionTypes.CLEAR_DATA:
        //     return {
        //         pathologiesList: {}
        //     }
        default:
            return state
    }
}