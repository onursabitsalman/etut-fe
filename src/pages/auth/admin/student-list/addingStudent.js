import React from 'react';
import Box from '@material-ui/core/Box';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import TransactionResultModal from 'src/components/transaction-result-modal';
import TextField from 'src/components/formElement/textfield';
import Button from 'src/components/formElement/button';
import Enums from 'src/libraries/enums';

import { addStudent } from 'src/globalstate/states/admin/student/action';

const logInValidationSchema = Yup.object().shape({
  username: Yup.string()
    .max(24, 'En fazla 24 karakter girilebilir!')
    .required('Kullanıcı adı boş olamaz'),
  name: Yup.string()
    .matches(/^[a-zA-Z]+$/, 'lütfen yalnızca harf giriniz!')
    .required('İsim boş olamaz'),
  surname: Yup.string()
    .matches(/^[a-zA-Z]+$/, 'lütfen yalnızca harf giriniz!')
    .required('Soyisim boş olamaz'),
  classCode: Yup.string()
    .matches(/^[0-9]+$/, 'lütfen yalnızca rakam giriniz!')
    .max(2, 'Sınıf en fazla 2 haneli olmalı!')
    .required('Sınıf boş olamaz'),
  phoneNumber: Yup.string()
    .length(11, 'Telefon numarası 11 haneli olmalı!')
    .required('Telefon numarası boş olamaz!'),
  password: Yup.string()
    .min(6, 'Şifre en az 6 haneli olmalı!')
    .max(12, 'Şİfre en fazla 12 haneli olabilir!')
    .required('Şifre boş olamaz')
});

const INITIAL_FORM_VALUES = {
  username: '',
  name: '',
  surname: '',
  classCode: '',
  phoneNumber: '',
  password: ''
};

const AddingStudent = (props) => {
  const handleSubmit = (submitData) => {
    props.addStudent(submitData).then((response) => {
      props.onClickClose();
    });
  };
  return (
    <TransactionResultModal
      title="Öğrenci Ekle"
      modalType={Enums.CONTENT_MODAL}
      {...props}
    >
      <Formik
        initialValues={{ ...INITIAL_FORM_VALUES }}
        validationSchema={logInValidationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <TextField name="username" label="Kullanıcı Adı" fullWidth />
          <TextField name="name" label="İsim" fullWidth />
          <TextField name="surname" label="Soyisim" fullWidth />
          <TextField name="classCode" label="Sınıf" fullWidth />
          <TextField name="phoneNumber" label="Telefon Numarası" fullWidth />
          <TextField name="password" label="Şifre" fullWidth type="password" />
          <Box textAlign="right">
            <Button
              text="Kaydet"
              type="submit"
              className="ml-auto"
              loading={props.addStudentReducer.fetching}
            />
          </Box>
        </Form>
      </Formik>
    </TransactionResultModal>
  );
};

const mapStateToProps = (state) => ({
  addStudentReducer: state.addStudentReducer
});

const mapDispatchToProps = {
  addStudent
};

export default connect(mapStateToProps, mapDispatchToProps)(AddingStudent);
