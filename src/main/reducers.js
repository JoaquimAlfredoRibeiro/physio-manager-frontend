import { combineReducers } from "redux";
import { i18nReducer } from "react-redux-i18n";
import { reducer as toastrReducer } from 'react-redux-toastr'

import patientReducer from '../components/patients/PatientReducer';
import authorizationReducer from '../components/authorization/AuthorizationReducer';
import errorReducer from '../components/authorization/ErrorReducer';

const rootReducer = combineReducers({
  i18n: i18nReducer,
  toastr: toastrReducer,
  patients: patientReducer,
  authorization: authorizationReducer,
  errors: errorReducer
});

export default rootReducer;
