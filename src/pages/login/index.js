import React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';

import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Formik, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import * as Yup from 'yup';

import TextField from 'src/components/formElement/textfield';
import Button from 'src/components/formElement/button';

import { login } from '../../globalstate/states/login/action';
import Enums from '../../libraries/enums';

const logInValidationSchema = Yup.object().shape({
  userName: Yup.string().max(24).required('Kullanıcı adı boş olamaz'),
  password: Yup.string().max(8).required('Şifre boş olamaz')
});

const INITIAL_FORM_VALUES = {
  userName: '',
  password: ''
};

const Login = (props) => {
  const navigate = useNavigate();

  const handleSubmitLogin = (submitData) => {
    navigate('auth/admin/dashboard');

    props
      .login(submitData.userName, submitData.password)
      .then((response) => {
        const decoded = jwt_decode(
          response.headers.authorization.replace('Bearer ', '')
        );
        if (decoded.sub === Enums.ADMIN) {
          navigate('auth/admin/dashboard');
        } else if (decoded.sub === Enums.STUDENT) {
          navigate('auth/student/dashboard');
        } else if (decoded.sub === Enums.TEACHER) {
          navigate('auth/teacher/dashboard');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Helmet>
        <title>Giriş | Kurum Adı</title>
      </Helmet>
      <Box
        height="100%"
        display="flex"
        justifyContent="center"
        flexDirection="column"
      >
        <Container maxWidth="sm">
          <Typography
            color="textPrimary"
            variant="h2"
            align="center"
            gutterBottom
          >
            Kurum Adı
          </Typography>
          {props.loginReducer.error && (
            <Alert className="mB15" variant="filled" severity="error">
              Invalid user or password
            </Alert>
          )}
          <Formik
            initialValues={{ ...INITIAL_FORM_VALUES }}
            validationSchema={logInValidationSchema}
            onSubmit={handleSubmitLogin}
          >
            <Form>
              <TextField name="userName" label="Kullanıcı Adı" />
              <TextField name="password" label="Şifre" type="password" />
              <Button text="Giriş" partofform />
            </Form>
          </Formik>
        </Container>
      </Box>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    loginReducer: state.loginReducer
  };
};

const mapDispatchToProps = {
  login
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
