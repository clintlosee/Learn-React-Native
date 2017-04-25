import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import EmployeeFormRuducer from './EmployeeFormReducer';
import EmployeeRuducer from './EmployeeReducer';

export default combineReducers({
    auth: AuthReducer,
    employeeForm: EmployeeFormRuducer,
    employees: EmployeeRuducer
});
