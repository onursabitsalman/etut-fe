import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import TransactionResultModal from 'src/components/transaction-result-modal';
import TextField from 'src/components/formElement/textfield';
import Button from 'src/components/formElement/button';
import Enums from 'src/libraries/enums';

import { addTeacher, updateTeacher } from 'src/globalstate/states/admin/teacher/action';

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
  majorType: Yup.string()
    .matches(regex, 'lütfen yalnızca harf giriniz!')
    .required('Ders boş olamaz'),
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
  majorType: '',
  phoneNumber: '',
  password: ''
};

const AddingTeacher = (props) => {
  const isUpdatingTeacher = props.teacher;

  const handleSubmit = (submitData) => {
    if (isUpdatingTeacher) {
      props.updateTeacher(submitData).then((response) => {
        props.onClickClose();
      });
    } else {
      props
        .addTeacher(submitData)
        .then(() => {
          props.onClickClose();
        })
        .catch((error) => {
          /* modal göster  */
          props.onClickClose();
        });
    }
  };

  return (
    <TransactionResultModal
      title={isUpdatingTeacher ? 'Profil' : 'Öğretmen Ekle'}
      modalType={Enums.CONTENT_MODAL}
      {...props}
    >
      <Formik
        initialValues={{ ...INITIAL_FORM_VALUES, ...props.teacher }}
        validationSchema={
          isUpdatingTeacher
            ? validationSchema
            : validationSchema.concat(optionalValidationSchema)
        }
        onSubmit={handleSubmit}
      >
        <Form>
          {!isUpdatingTeacher && (
            <TextField name="username" label="Kullanıcı Adı" fullWidth />
          )}
          <TextField name="name" label="İsim" fullWidth />
          <TextField name="surname" label="Soyisim" fullWidth />
          <TextField name="majorType" label="Ders" fullWidth />
          <TextField name="phoneNumber" label="Telefon Numarası" fullWidth />
          {!isUpdatingTeacher && (
            <TextField name="password" label="Şifre" fullWidth type="password" />
          )}
          <Box textAlign="right">
            <Button
              text={isUpdatingTeacher ? 'Güncelle' : 'Kaydet'}
              type="submit"
              loading={
                props.addTeacherReducer.fetching || props.updateTeacherReducer.fetching
              }
            />
          </Box>
        </Form>
      </Formik>
    </TransactionResultModal>
  );
};

const mapStateToProps = (state) => ({
  addTeacherReducer: state.addTeacherReducer,
  updateTeacherReducer: state.updateTeacherReducer
});

const mapDispatchToProps = {
  addTeacher,
  updateTeacher
};

export default connect(mapStateToProps, mapDispatchToProps)(AddingTeacher);
