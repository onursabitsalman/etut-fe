import DashboardLayout from 'src/components/dashboard-layout';
import MainLayout from 'src/components/main-layout';

import AdminDashboard from 'src/pages/auth/admin/dashboard';
import StudentList from 'src/pages/auth/admin/student-list';
import TeacherList from 'src/pages/auth/admin/teacher-list';
import AdminSettings from 'src/pages/auth/admin/settings';

import StudentDashboard from 'src/pages/auth/student/dashboard';
import StudentAccount from 'src/pages/auth/student/account';
import TakeLesson from 'src/pages/auth/student/take-lesson';
import StudentSettings from 'src/pages/auth/student/settings';

import TeacherDashboard from 'src/pages/auth/teacher/dashboard';
import TeacherAccount from 'src/pages/auth/teacher/account';
import TeacherSettings from 'src/pages/auth/teacher/settings';
import Lessons from 'src/pages/auth/teacher/lessons';

import Login from 'src/pages/login';
import NotFound from 'src/pages/not-found';

const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <Login /> },
      { path: '404', element: <NotFound /> }
      /* { path: '/', element: <Navigate to="/auth/admin/dashboard" /> }, */
      /*  { path: '*', element: <Navigate to="/404" /> } */
    ]
  },
  {
    path: 'auth/admin',
    element: <DashboardLayout />,
    children: [
      { path: 'dashboard', element: <AdminDashboard /> },
      { path: 'teachers', element: <TeacherList /> },
      { path: 'students', element: <StudentList /> },
      { path: 'settings', element: <AdminSettings /> }
      /*  { path: '*', element: <Navigate to="/404" /> } */
    ]
  },
  {
    path: 'auth/student',
    element: <DashboardLayout />,
    children: [
      { path: 'dashboard', element: <StudentDashboard /> },
      { path: 'account', element: <StudentAccount /> },
      { path: 'take-lessons', element: <TakeLesson /> },
      { path: 'settings', element: <StudentSettings /> }

      /*  { path: '*', element: <Navigate to="/404" /> } */
    ]
  },
  {
    path: 'auth/teacher',
    element: <DashboardLayout />,
    children: [
      { path: 'dashboard', element: <TeacherDashboard /> },
      { path: 'account', element: <TeacherAccount /> },
      { path: 'lessons', element: <Lessons /> },
      { path: 'settings', element: <TeacherSettings /> }

      /* { path: '*', element: <Navigate to="/404" /> } */
    ]
  }
];

export default routes;
