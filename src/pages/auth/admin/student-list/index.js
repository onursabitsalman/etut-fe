import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Input from '@material-ui/core/Input';
import Stack from '@material-ui/core/Stack';
import Box from '@material-ui/core/Box';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import MUIDataTable from 'mui-datatables';

import TransactionResultModal from 'src/components/transaction-result-modal';
import Loading from 'src/components/loading';
import Title from 'src/components/title';
import ShowError from 'src/components/show-error';
import Button from 'src/components/formElement/button';

import AddingStudent from './addingStudent';

import Enums from 'src/libraries/enums';

import {
  getStudentList,
  deleteStudent
} from 'src/globalstate/states/admin/student/action';

import { getColumns } from './helper';

const modalEnums = {
  UPLOADED_EXCEL: 'UPLOADED_EXCEL',
  ADDING_STUDENT: 'ADDING_STUDENT'
};

const StudentList = (props) => {
  const [modal, setModal] = useState({ name: '', alertType: '', content: '' });

  useEffect(() => {
    props.getStudentList();
  }, []);

  const handleClickIcon = (e, calledFunction, studentId) => {
    e.stopPropagation();
    console.log('handle-click-icons');
  };

  /* const handleClickUploadExcel = (e) => {
    console.log('on-click', e);
  }; */

  const handleCloseModal = () => {
    setModal({ name: '' });
  };

  const handleCapture = (e) => {
    const fileName = e.target.files[0].name;
    if (fileName.includes('.xlsx')) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(e.target.files[0]);
      fileReader.onload = (event) => {
        console.log('event.target.result: ', event.target.result);
        /* setModal({ name: modalEnums.UPLOADED_EXCEL ,type: Enums.SUCCESS }); */
        /* excel okuyan servis cagrılacak   */
      };
    } else {
      setModal({
        name: modalEnums.UPLOADED_EXCEL,
        type: Enums.ERROR,
        content: 'Lütfen excel dosyası seçin.'
      });
    }
  };

  const handleDelete = ({ data }) => {
    const deletedStudentIds = data.map(
      (d) => props.studentListReducer.data.studentList[d.index].id
    );
    props.deleteStudent(deletedStudentIds);
  };

  return (
    <>
      <Title title="Student | Kurum Adu" />
      {(props.studentListReducer.fetching || props.deleteStudentReducer.fetching) && (
        <Loading />
      )}
      {props.studentListReducer.error ? (
        <ShowError error={props.studentListReducer.error} />
      ) : props.studentListReducer.success ? (
        <Box>
          <Box className="mB10" display="flex">
            <Button
              startIcon={<PersonAddIcon />}
              text="Öğrenci Ekle"
              onClick={() => setModal({ name: modalEnums.ADDING_STUDENT })}
            />
            <Stack>
              <label htmlFor="contained-button-file">
                <Input
                  accept="image/*"
                  id="contained-button-file"
                  multiple
                  type="file"
                  sx={{ display: 'none' }}
                  onChange={handleCapture}
                />
                <Button
                  className="mL5"
                  startIcon={<NoteAddIcon />}
                  text="Excel Yükle"
                  variant="outlined"
                />
              </label>
            </Stack>
          </Box>
          <MUIDataTable
            title="Ögrenci Listesi"
            data={props.studentListReducer.data.studentList}
            columns={getColumns(handleClickIcon)}
            options={{
              onRowClick: (e) => console.log('haydar', e),
              onRowsDelete: handleDelete,
              print: false,
              viewColumns: false,
              download: false
            }}
          />
          <TransactionResultModal
            open={modal.name === modalEnums.UPLOADED_EXCEL}
            onClickClose={handleCloseModal}
            title="Excel Yükleme"
            alertType={modal.type}
            content={modal.content}
          />
          <AddingStudent
            open={modal.name === modalEnums.ADDING_STUDENT}
            onClickClose={handleCloseModal}
          />
        </Box>
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => ({
  studentListReducer: state.studentListReducer,
  deleteStudentReducer: state.deleteStudentReducer
});

const mapDispatchToProps = {
  getStudentList,
  deleteStudent
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentList);
