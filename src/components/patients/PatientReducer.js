import PatientActionTypes from "./PatientActionTypes";

const INITIAL_STATE = { patientList: [] }

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PatientActionTypes.GET_ALL_PATIENTS:
            return {
                patientList: action.payload.data
            }
        case PatientActionTypes.CLEAR_DATA:
            return {
                patientList: action.payload
            }
        default:
            return state
    }
}