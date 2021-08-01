import DashboardLayout from 'src/components/dashboard-layout';
import MainLayout from 'src/components/main-layout';

import AdminDashboard from 'src/pages/auth/admin/dashboard';
import StudentList from 'src/pages/auth/admin/student-list';
import AdminSettings from 'src/pages/auth/admin/settings';
import TeacherList from 'src/pages/auth/admin/teacher-list';
import SetCourse from 'src/pages/auth/admin/teacher-list/set-course';

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

import { Switch, Route } from 'react-router-dom';

const useRoutes = () => {
  return (
    <Switch>
      <Route
        path="/"
        exact
        render={() => (
          <MainLayout>
            <Route component={Login} />
          </MainLayout>
        )}
      />
      <Route
        path="/admin"
        render={({ match: { url } }) => (
          <DashboardLayout>
            <Route path={`${url}/dashboard`} component={AdminDashboard} />
            <Route
              path={`${url}/teachers`}
              render={({ match: { url } }) => (
                <>
                  <Route path={`${url}`} component={TeacherList} exact />
                  <Route path={`${url}/set-course/:id`} component={SetCourse} />
                </>
              )}
            />
            <Route path={`${url}/students`} component={StudentList} />
            <Route path={`${url}/settings`} component={AdminSettings} />
          </DashboardLayout>
        )}
      />

      {/* <Route component={NotFound} /> */}
    </Switch>
  );
};

export default useRoutes;
