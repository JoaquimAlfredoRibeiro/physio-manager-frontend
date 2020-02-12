import PatientActionTypes from "./PatientActionTypes";

const INITIAL_STATE = { patientList: [], showPatientDialog: false }

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
                showPatientDialog: false
            }
        case PatientActionTypes.UPDATE_PATIENT:
            return {
                ...state,
                showPatientDialog: false
            }
        case PatientActionTypes.DELETE_PATIENT:
            return {
                ...state
            }
        case PatientActionTypes.SET_SHOW_PATIENT_DIALOG:
            return {
                ...state,
                showPatientDialog: action.payload
            }
        case PatientActionTypes.CLEAR_DATA:
            return {
                patientList: {}
            }
        default:
            return state
    }
}