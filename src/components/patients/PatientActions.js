import axios from 'axios'
import { toastr } from 'react-redux-toastr'

import PatientActionTypes from "./PatientActionTypes";
import appConstants from '../../appConstants';

import _ from 'lodash'

const BASE_URL = appConstants.API_URL + '/patients'
var I18n = require('react-redux-i18n').I18n;

export function getAllPatients() {
    return dispatch => {
        axios.get(`${BASE_URL}`)
            .then(response => {
                dispatch([
                    {
                        type: PatientActionTypes.GET_ALL_PATIENTS,
                        payload: response
                    }
                ])
            })
            .catch(e => {
                if (_.get(e, ['response', 'data', 'message'], false)) {
                    toastr.error(I18n.t('toastr.error'), I18n.t(`toastr.${e.response.data.message}`))
                } else {
                    toastr.error(I18n.t('toastr.error'), e.message)
                }
            })
    }
}

export function getPatientInfo(id) {
    return dispatch => {
        axios.get(`${BASE_URL}/${id}`)
            .then(response => {
                dispatch([
                    {
                        type: PatientActionTypes.GET_PATIENT_BY_ID,
                        payload: response
                    }
                ])
            })
            .catch(e => {
                if (_.get(e, ['response', 'data', 'message'], false)) {
                    toastr.error(I18n.t('toastr.error'), I18n.t(`toastr.${e.response.data.message}`))
                } else {
                    toastr.error(I18n.t('toastr.error'), e.message)
                }
            })
    }
}

export function createPatient(patient) {
    return dispatch => {
        axios.post(`${BASE_URL}`, patient)
            .then(response => {
                dispatch([
                    {
                        type: PatientActionTypes.CREATE_PATIENT,
                    }
                ])
            })
            .then(response => this.getAllPatients())
            //success message
            .then(response => { toastr.success(I18n.t('toastr.success'), I18n.t('patients.addPatientSuccess')) })
            .catch(e => {
                //if error message is ApiResponse
                if (_.get(e, ['response', 'data', 'message'], false)) {
                    dispatch({
                        type: PatientActionTypes.GET_ERRORS,
                        payload: {}
                    });
                    toastr.error(I18n.t('toastr.error'), e.response.data.message)
                    //if error message is provided by Spring Valid
                } else if (_.get(e, ['response', 'data'], false)) {
                    dispatch({
                        type: PatientActionTypes.GET_ERRORS,
                        payload: e.response.data
                    });
                } else {
                    toastr.error(I18n.t('toastr.error'), e.message)
                }
            });
    }
}

export function updatePatient(patient) {
    return dispatch => {
        axios.put(`${BASE_URL}/${patient.id}`, patient)
            .then(response => {
                dispatch([
                    {
                        type: PatientActionTypes.UPDATE_PATIENT,
                    }
                ])
            })
            .then(response => this.getAllPatients())
            //success message
            .then(response => { toastr.success(I18n.t('toastr.success'), I18n.t('patients.editPatientSuccess')) })
            .catch(e => {
                //if error message is ApiResponse
                if (_.get(e, ['response', 'data', 'message'], false)) {
                    dispatch({
                        type: PatientActionTypes.GET_ERRORS,
                        payload: {}
                    });
                    toastr.error(I18n.t('toastr.error'), e.response.data.message)
                    //if error message is provided by Spring Valid
                } else if (_.get(e, ['response', 'data'], false)) {
                    dispatch({
                        type: PatientActionTypes.GET_ERRORS,
                        payload: e.response.data
                    });
                } else {
                    toastr.error(I18n.t('toastr.error'), e.message)
                }
            });
    }
}

export function deletePatient(id) {
    return dispatch => {
        axios.delete(`${BASE_URL}/${id}`)
            .then(response => {
                dispatch([
                    {
                        type: PatientActionTypes.DELETE_PATIENT,
                        payload: response
                    }
                ])
            })
            .then(response => this.getAllPatients())
            .catch(e => {
                if (_.get(e, ['response', 'data', 'message'], false)) {
                    toastr.error(I18n.t('toastr.error'), I18n.t(`toastr.${e.response.data.message}`))
                } else {
                    toastr.error(I18n.t('toastr.error'), e.message)
                }
            })
    }
}

export function setShowPatientDialog(state) {
    return {
        type: PatientActionTypes.SET_SHOW_PATIENT_DIALOG,
        payload: state
    }
}

export function setShowAddPathologyDialog(state) {
    return {
        type: PatientActionTypes.SET_SHOW_ADD_PATHOLOGY_DIALOG,
        payload: state
    }
}

export function setSelectedPatient(id) {
    return {
        type: PatientActionTypes.SET_SELECTED_PATIENT,
        payload: id
    }
}

export function clearData() {
    return {
        type: PatientActionTypes.CLEAR_DATA,
        payload: {}
    }
}

export function clearErrors() {
    return {
        type: PatientActionTypes.CLEAR_ERRORS,
        payload: {}
    }
}
