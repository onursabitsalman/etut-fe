import { combineReducers } from 'redux';
import loginReducer from './states/login/reducer';
import {
  deleteStudentReducer,
  studentListReducer
} from './states/admin/student/reducer';

export default combineReducers({
  loginReducer,
  studentListReducer,
  deleteStudentReducer
});
