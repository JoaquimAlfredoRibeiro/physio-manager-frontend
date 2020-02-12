import PatientActionTypes from "./PatientActionTypes";

const INITIAL_STATE = { patientList: [], showNewPatient: false, showEditPatient: false }

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PatientActionTypes.GET_ALL_PATIENTS:
            return {
                ...state,
                patientList: action.payload.data
            }
        case PatientActionTypes.CREATE_PATIENT:
            return {
                ...state,
                showNewPatient: false
            }
        case PatientActionTypes.UPDATE_PATIENT:
            return {
                patientList: action.payload.data
            }
        case PatientActionTypes.DELETE_PATIENT:
            return {
                patientList: action.payload.data
            }
        case PatientActionTypes.SET_SHOW_NEW_PATIENT_STATE:
            return {
                ...state,
                showNewPatient: action.payload
            }
        case PatientActionTypes.SET_SHOW_EDIT_PATIENT_STATE:
            return {
                ...state,
                showEditPatient: action.payload
            }
        case PatientActionTypes.CLEAR_DATA:
            return {
                patientList: {}
            }
        default:
            return state
    }
}