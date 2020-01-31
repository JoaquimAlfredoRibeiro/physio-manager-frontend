import axios from 'axios'
import { toastr } from 'react-redux-toastr'

import PatientActionTypes from "./PatientActionTypes";

const BASE_URL = 'http://localhost:8080/api/v1'

export function getAllPatients() {
    return dispatch => {
        axios.get(`${BASE_URL}/patients`)
            .then(response => {
                dispatch([
                    {
                        type: PatientActionTypes.GET_ALL_PATIENTS,
                        payload: response
                    }
                ])
            })
            .catch(e => {
                toastr.error('Error', e.message)
            })
    }
}