import { combineReducers } from 'redux';
import loginReducer from './states/login/reducer';
import {
  deleteStudentReducer,
  studentListReducer,
  addStudentReducer,
  uploadStudentExcelReducer,
  downloadStudentExcelReducer,
  updateStudentReducer
} from './states/admin/student/reducer';
import {
  teacherListReducer,
  deleteTeacherReducer,
  addTeacherReducer,
  updateTeacherReducer
} from './states/admin/teacher/reducer';

export default combineReducers({
  loginReducer,
  studentListReducer,
  deleteStudentReducer,
  addStudentReducer,
  uploadStudentExcelReducer,
  downloadStudentExcelReducer,
  updateStudentReducer,
  teacherListReducer,
  deleteTeacherReducer,
  addTeacherReducer,
  updateTeacherReducer
});
