import axios from 'axios'
import { toastr } from 'react-redux-toastr'

import PathologiesActionTypes from "./PathologiesActionTypes";
import appConstants from '../../appConstants';

import _ from 'lodash'

const BASE_URL = appConstants.API_URL + '/pathologies'
var I18n = require('react-redux-i18n').I18n;

export function getAllPathologies() {
    return dispatch => {
        axios.get(`${BASE_URL}`)
            .then(response => {
                dispatch([
                    {
                        type: PathologiesActionTypes.GET_ALL_PATHOLOGIES,
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

export function createPathology(pathology) {
    return dispatch => {
        axios.post(`${BASE_URL}`, pathology)
            .then(response => {
                dispatch([
                    {
                        type: PathologiesActionTypes.CREATE_PATHOLOGY,
                    }
                ])
            })
            .then(response => this.getAllPathologies())
            //success message
            .then(response => { toastr.success(I18n.t('toastr.success'), I18n.t('pathologies.addPathologySuccess')) })
            .catch(e => {
                //if error message is ApiResponse
                if (_.get(e, ['response', 'data', 'message'], false)) {
                    dispatch({
                        type: PathologiesActionTypes.GET_ERRORS,
                        payload: {}
                    });
                    toastr.error(I18n.t('toastr.error'), e.response.data.message)
                    //if error message is provided by Spring Valid
                } else if (_.get(e, ['response', 'data'], false)) {
                    dispatch({
                        type: PathologiesActionTypes.GET_ERRORS,
                        payload: e.response.data
                    });
                } else {
                    toastr.error(I18n.t('toastr.error'), e.message)
                }
            });
    }
}

export function updatePathology(pathology) {
    return dispatch => {
        axios.put(`${BASE_URL}/${pathology.id}`, pathology)
            .then(response => {
                dispatch([
                    {
                        type: PathologiesActionTypes.UPDATE_PATHOLOGY,
                    }
                ])
            })
            .then(response => this.getAllPathologies())
            //success message
            .then(response => { toastr.success(I18n.t('toastr.success'), I18n.t('pathologies.editPathologySuccess')) })
            .catch(e => {
                //if error message is ApiResponse
                if (_.get(e, ['response', 'data', 'message'], false)) {
                    dispatch({
                        type: PathologiesActionTypes.GET_ERRORS,
                        payload: {}
                    });
                    toastr.error(I18n.t('toastr.error'), e.response.data.message)
                    //if error message is provided by Spring Valid
                } else if (_.get(e, ['response', 'data'], false)) {
                    dispatch({
                        type: PathologiesActionTypes.GET_ERRORS,
                        payload: e.response.data
                    });
                } else {
                    toastr.error(I18n.t('toastr.error'), e.message)
                }
            });
    }
}

export function deletePathology(id) {
    return dispatch => {
        axios.delete(`${BASE_URL}/${id}`)
            .then(response => {
                dispatch([
                    {
                        type: PathologiesActionTypes.DELETE_PATHOLOGY,
                        payload: response
                    }
                ])
            })
            .then(response => this.getAllPathologies())
            .catch(e => {
                if (_.get(e, ['response', 'data', 'message'], false)) {
                    toastr.error(I18n.t('toastr.error'), I18n.t(`toastr.${e.response.data.message}`))
                } else {
                    toastr.error(I18n.t('toastr.error'), e.message)
                }
            })
    }
}

export function setShowPathologyDialog(state) {
    return {
        type: PathologiesActionTypes.SET_SHOW_PATHOLOGY_DIALOG,
        payload: state
    }
}

export function clearData() {
    return {
        type: PathologiesActionTypes.CLEAR_DATA,
        payload: {}
    }
}

export function clearErrors() {
    return {
        type: PathologiesActionTypes.CLEAR_ERRORS,
        payload: {}
    }
}