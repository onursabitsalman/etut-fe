import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import Input from '@material-ui/core/Input';
import Stack from '@material-ui/core/Stack';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import DeleteIcon from '@material-ui/icons/Delete';
import MUIDataTable from 'mui-datatables';

import TransactionResultModal from 'src/components/transaction-result-modal';

import Enums from 'src/libraries/enums';

import {
  getStudentList,
  deleteStudent
} from 'src/globalstate/states/admin/student/action';

import { getColumns } from './helper';

const modalEnums = {
  UPLOADED_EXCEL: 'UPLOADED_EXCEL'
};

const StudentList = (props) => {
  const [modalToBeOpened, setModalToBeOpened] = useState({
    name: '',
    type: ''
  });

  useEffect(() => {
    // Your code here
    props.getStudentList();
  }, []);

  const handleClickIcon = (e, calledFunction, studentId) => {
    e.stopPropagation();
    if (calledFunction === '3') {
      props.deleteStudent(studentId).then(() => {
        props.getStudentList();
      });
    }
    console.log('handle-click-icons');
  };

  /* const handleClickUploadExcel = (e) => {
    console.log('on-click', e);
  }; */

  const handleCloseModal = () => {
    setModalToBeOpened({ type: '', show: false });
  };

  const handleCapture = (e) => {
    const fileName = e.target.files[0].name;
    if (fileName.includes('.xlsx')) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(e.target.files[0]);
      fileReader.onload = (event) => {
        console.log('event.target.result: ', event.target.result);
        /* setModalToBeOpened({ name: modalEnums.UPLOADED_EXCEL ,type: Enums.SUCCESS }); */
        /* excel okuyan servis cagrılacak   */
      };
    } else {
      setModalToBeOpened({
        name: modalEnums.UPLOADED_EXCEL,
        type: Enums.ERROR,
        content: 'Lütfen excel dosyası seçin.'
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Students | Kurum Adı</title>
      </Helmet>
      <Box>
        <Box className="mB10" display="flex">
          <Button
            sx={{ mx: 1 }}
            color="primary"
            variant="contained"
            startIcon={<PersonAddIcon />}
          >
            Öğrenci Ekle
          </Button>
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
                sx={{ mx: 1 }}
                color="primary"
                variant="outlined"
                startIcon={<NoteAddIcon />}
                component="span"
              >
                Excel Yükle
              </Button>
            </label>
          </Stack>
          <Button
            sx={{ mx: 1 }}
            color="secondary"
            variant="outlined"
            startIcon={<DeleteIcon />}
          >
            Sil
          </Button>
        </Box>
        <MUIDataTable
          title="Ögrenci Listesi"
          data={props.studentListReducer.data.studentList}
          columns={getColumns(handleClickIcon)}
          options={{
            onRowClick: (e) => console.log('haydar', e),
            print: false,
            viewColumns: false,
            download: false
          }}
        />
        <TransactionResultModal
          open={modalToBeOpened.name}
          onClickClose={handleCloseModal}
          title="Excel Yükleme"
          alertType={modalToBeOpened.type}
          content={modalToBeOpened.content}
        />
      </Box>
    </>
  );
};

const mapStateToProps = (state) => ({
  studentListReducer: state.studentListReducer
});

const mapDispatchToProps = {
  getStudentList,
  deleteStudent
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentList);
