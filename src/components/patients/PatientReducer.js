import PatientActionTypes from "./PatientActionTypes";

const INITIAL_STATE = {
    patientList: [],
    patientInfo: {},
    showPatientDialog: false,
    showAddPathologyDialog: false,
    selectedPatient: -1
}

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
        case PatientActionTypes.SET_SHOW_ADD_PATHOLOGY_DIALOG:
            return {
                ...state,
                showAddPathologyDialog: action.payload
            }
        case PatientActionTypes.SET_SELECTED_PATIENT:
            return {
                ...state,
                selectedPatient: action.payload
            }
        case PatientActionTypes.GET_PATIENT_BY_ID:
            return {
                ...state,
                patientInfo: action.payload.data
            }
        case PatientActionTypes.CLEAR_DATA:
            return {
                patientList: {}
            }
        default:
            return state
    }
}