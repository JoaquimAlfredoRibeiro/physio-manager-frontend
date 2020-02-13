import PathologiesActionTypes from "./PathologiesActionTypes";

const INITIAL_STATE = { pathologiesList: [], showPathologyDialog: false }

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PathologiesActionTypes.GET_ALL_PATHOLOGIES:
            return {
                ...state,
                pathologiesList: action.payload.data
            }
        case PathologiesActionTypes.CREATE_PATHOLOGY:
            return {
                ...state,
                showPathologyDialog: false
            }
        case PathologiesActionTypes.UPDATE_PATHOLOGY:
            return {
                ...state,
                showPathologyDialog: false
            }
        case PathologiesActionTypes.DELETE_PATHOLOGY:
            return {
                ...state
            }
        case PathologiesActionTypes.SET_SHOW_PATHOLOGY_DIALOG:
            return {
                ...state,
                showPathologyDialog: action.payload
            }
        case PathologiesActionTypes.CLEAR_DATA:
            return {
                pathologiesList: {}
            }
        default:
            return state
    }
}