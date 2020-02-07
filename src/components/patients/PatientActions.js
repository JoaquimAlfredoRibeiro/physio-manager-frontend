import axios from 'axios'
import { toastr } from 'react-redux-toastr'

import PatientActionTypes from "./PatientActionTypes";
import appConstants from '../../appConstants';

import _ from 'lodash'

const BASE_URL = appConstants.API_URL
var I18n = require('react-redux-i18n').I18n;

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
        type: PatientActionTypes.CLEAR_DATA,
        payload: []
    }
}