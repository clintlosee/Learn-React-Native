import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import EmployeeFormRuducer from './EmployeeFormReducer';

export default combineReducers({
    auth: AuthReducer,
    employeeForm: EmployeeFormRuducer
});
