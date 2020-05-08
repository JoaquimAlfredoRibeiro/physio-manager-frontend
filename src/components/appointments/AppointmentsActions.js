import axios from 'axios'
import { toastr } from 'react-redux-toastr'

import AppointmentsActionTypes from "./AppointmentsActionTypes";
import appConstants from '../../appConstants';

import _ from 'lodash'

const BASE_URL = appConstants.API_URL + '/consultations'
var I18n = require('react-redux-i18n').I18n;

export function getAllAppointments() {
    return dispatch => {
        axios.get(`${BASE_URL}`)
            .then(response => {
                dispatch([
                    {
                        type: AppointmentsActionTypes.GET_ALL_APPOINTMENTS,
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

export function createAppointment(appointment) {
    return dispatch => {
        axios.post(`${BASE_URL}`, appointment)
            .then(response => {
                dispatch([
                    {
                        type: AppointmentsActionTypes.CREATE_APPOINTMENT,
                    }
                ])
            })
            .then(response => this.getAllAppointments())
            //success message
            .then(response => { toastr.success(I18n.t('toastr.success'), I18n.t('appointments.addAppointmentSuccess')) })
            .catch(e => {
                //if error message is ApiResponse
                if (_.get(e, ['response', 'data', 'message'], false)) {
                    dispatch({
                        type: AppointmentsActionTypes.GET_ERRORS,
                        payload: {}
                    });
                    toastr.error(I18n.t('toastr.error'), e.response.data.message)
                    //if error message is provided by Spring Valid
                } else if (_.get(e, ['response', 'data'], false)) {
                    dispatch({
                        type: AppointmentsActionTypes.GET_ERRORS,
                        payload: e.response.data
                    });
                } else {
                    toastr.error(I18n.t('toastr.error'), e.message)
                }
            });
    }
}

export function updateAppointment(appointment) {
    return dispatch => {
        axios.put(`${BASE_URL}/${appointment.id}`, appointment)
            .then(response => {
                dispatch([
                    {
                        type: AppointmentsActionTypes.UPDATE_APPOINTMENT,
                    }
                ])
            })
            .then(response => this.getAllAppointments())
            //success message
            .then(response => { toastr.success(I18n.t('toastr.success'), I18n.t('appointments.editAppointmentSuccess')) })
            .catch(e => {
                //if error message is ApiResponse
                if (_.get(e, ['response', 'data', 'message'], false)) {
                    dispatch({
                        type: AppointmentsActionTypes.GET_ERRORS,
                        payload: {}
                    });
                    toastr.error(I18n.t('toastr.error'), e.response.data.message)
                    //if error message is provided by Spring Valid
                } else if (_.get(e, ['response', 'data'], false)) {
                    dispatch({
                        type: AppointmentsActionTypes.GET_ERRORS,
                        payload: e.response.data
                    });
                } else {
                    toastr.error(I18n.t('toastr.error'), e.message)
                }
            });
    }
}

export function deleteAppointment(id) {
    return dispatch => {
        axios.delete(`${BASE_URL}/${id}`)
            .then(response => {
                dispatch([
                    {
                        type: AppointmentsActionTypes.DELETE_APPOINTMENT,
                        payload: response
                    }
                ])
            })
            .then(response => this.getAllAppointments())
            .catch(e => {
                if (_.get(e, ['response', 'data', 'message'], false)) {
                    toastr.error(I18n.t('toastr.error'), I18n.t(`toastr.${e.response.data.message}`))
                } else {
                    toastr.error(I18n.t('toastr.error'), e.message)
                }
            })
    }
}

export function clearData() {
    return {
        type: AppointmentsActionTypes.CLEAR_DATA,
        payload: {}
    }
}
