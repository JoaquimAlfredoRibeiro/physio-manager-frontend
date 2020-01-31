import { combineReducers } from "redux";
import { i18nReducer } from "react-redux-i18n";
import patientReducer from '../components/patients/PatientReducer';

const rootReducer = combineReducers({
  i18n: i18nReducer,
  patients: patientReducer,
});

export default rootReducer;
