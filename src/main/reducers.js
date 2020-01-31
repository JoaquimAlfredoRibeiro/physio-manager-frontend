import { combineReducers } from "redux";
import { i18nReducer } from "react-redux-i18n";
import { reducer as toastrReducer } from 'react-redux-toastr'

import patientReducer from '../components/patients/PatientReducer';

const rootReducer = combineReducers({
  i18n: i18nReducer,
  toastr: toastrReducer,
  patients: patientReducer,
});

export default rootReducer;
