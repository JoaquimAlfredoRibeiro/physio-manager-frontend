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
        case AppointmentsActionTypes.UPDATE_APPOINTMENT:
            return {
                ...state
            }
        case AppointmentsActionTypes.DELETE_APPOINTMENT:
            return {
                ...state
            }
        case AppointmentsActionTypes.CLEAR_DATA:
            return {
                appointmentsList: []
            }
        default:
            return state
    }
}