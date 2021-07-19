import { combineReducers } from 'redux';
import loginReducer from './states/login/reducer';
import {
  deleteStudentReducer,
  studentListReducer,
  addStudentReducer,
  uploadStudentExcelReducer,
  downloadStudentExcelReducer
} from './states/admin/student/reducer';

export default combineReducers({
  loginReducer,
  studentListReducer,
  deleteStudentReducer,
  addStudentReducer,
  uploadStudentExcelReducer,
  downloadStudentExcelReducer
});
