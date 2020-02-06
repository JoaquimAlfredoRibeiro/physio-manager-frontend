import axios from 'axios'
import { toastr } from 'react-redux-toastr'

import PatientActionTypes from "./PatientActionTypes";
import appConstants from '../../appConstants';

import _ from 'lodash'

const BASE_URL = appConstants.API_URL
var I18n = require('react-redux-i18n').I18n;

// const request = (options) => {
//     const headers = new Headers({
//         'Content-Type': 'application/json',
//     })

//     headers.append('Authorization', 'Bearer localStorage.getItem(ACCESS_TOKEN)')

//     const defaults = { headers: headers };
//     options = Object.assign({}, defaults, options);

//     return fetch(options.url, options)
//         .then(response =>
//             response.json().then(json => {
//                 if (!response.ok) {
//                     return Promise.reject(json);
//                 }
//                 return json;
//             })
//         );
// };

export function getAllPatients() {
    return dispatch => {
        axios.get(`${BASE_URL}/patients`)
            // axios.get(`${BASE_URL}/patients`, { headers: { "Authorization": `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNTgwODMxNjYzLCJleHAiOjE1ODE0MzY0NjN9.8WcWZzA9b9lJs6j7TYxt4-_BzTH6bVjRkrc0pC5mSE9oRkEc5ldgfA0xc8Nse8vb8yqAdYFyOY2DdlLSbBbK3w` } })
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