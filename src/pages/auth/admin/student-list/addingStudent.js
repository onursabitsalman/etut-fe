import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import CustomModal from 'src/components/custom-modal';
import TextField from 'src/components/formElement/textfield';
import Button from 'src/components/formElement/button';
import Enums from 'src/libraries/enums';

import { addStudent, updateStudent } from 'src/globalstate/states/admin/student/action';

const regex = /^[a-zA-ZığüşöçİĞÜŞÖÇ]+$/;

const modalEnums = {
  ADD_STUDENT_ERROR: 'ADD_STUDENT_ERROR'
};

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(regex, 'lütfen yalnızca harf giriniz!')
    .required('İsim boş olamaz'),
  surname: Yup.string()
    .matches(regex, 'lütfen yalnızca harf giriniz!')
    .required('Soyisim boş olamaz'),
  classCode: Yup.string()
    .matches(/^[0-9]+$/, 'lütfen yalnızca rakam giriniz!')
    .max(2, 'Sınıf en fazla 2 haneli olmalı!')
    .required('Sınıf boş olamaz'),
  phoneNumber: Yup.string()
    .length(11, 'Telefon numarası 11 haneli olmalı!')
    .required('Telefon numarası boş olamaz!')
});

const optionalValidationSchema = Yup.object().shape({
  username: Yup.string()
    .max(24, 'En fazla 24 karakter girilebilir!')
    .required('Kullanıcı adı boş olamaz'),
  password: Yup.string()
    .min(6, 'Şifre en az 6 haneli olmalı!')
    .max(12, 'Şİfre en fazla 12 haneli olabilir!')
    .required('Şifre boş olamaz!')
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
  const [modal, setModal] = useState('');

  const isUpdatingStudent = props.student;

  const handleSubmit = (submitData) => {
    if (isUpdatingStudent) {
      props.updateStudent(submitData).then((response) => {
        props.onClickClose();
      });
    } else {
      props
        .addStudent(submitData)
        .then(() => {
          props.onClickClose();
        })
        .catch((error) => {
          /* modal göster  */
          props.onClickClose();
          setModal(modalEnums.ADD_STUDENT_ERROR);
        });
    }
  };

  return (
    <CustomModal
      title={isUpdatingStudent ? 'Profil' : 'Öğrenci Ekle'}
      modalType={Enums.CONTENT_MODAL}
      {...props}
    >
      <Formik
        initialValues={{ ...INITIAL_FORM_VALUES, ...props.student }}
        validationSchema={
          isUpdatingStudent
            ? validationSchema
            : validationSchema.concat(optionalValidationSchema)
        }
        onSubmit={handleSubmit}
      >
        <Form>
          {!isUpdatingStudent && (
            <TextField name="username" label="Kullanıcı Adı" fullWidth />
          )}
          <TextField name="name" label="İsim" fullWidth />
          <TextField name="surname" label="Soyisim" fullWidth />
          <TextField name="classCode" label="Sınıf" fullWidth />
          <TextField name="phoneNumber" label="Telefon Numarası" fullWidth />
          {!isUpdatingStudent && (
            <TextField name="password" label="Şifre" fullWidth type="password" />
          )}
          <Box textAlign="right">
            <Button
              text={props.student ? 'Güncelle' : 'Kaydet'}
              type="submit"
              loading={
                props.addStudentReducer.fetching || props.updateStudentReducer.fetching
              }
            />
          </Box>
        </Form>
      </Formik>
    </CustomModal>
  );
};

const mapStateToProps = (state) => ({
  addStudentReducer: state.addStudentReducer,
  updateStudentReducer: state.updateStudentReducer
});

const mapDispatchToProps = {
  addStudent,
  updateStudent
};

export default connect(mapStateToProps, mapDispatchToProps)(AddingStudent);
