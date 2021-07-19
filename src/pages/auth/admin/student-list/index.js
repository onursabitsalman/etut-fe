import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import fileDownload from 'js-file-download';
import MUIDataTable from 'mui-datatables';

import Input from '@material-ui/core/Input';
import Box from '@material-ui/core/Box';

import PersonAddIcon from '@material-ui/icons/PersonAdd';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import BackupIcon from '@material-ui/icons/Backup';

import TransactionResultModal from 'src/components/transaction-result-modal';
import Loading from 'src/components/loading';
import Title from 'src/components/title';
import ShowError from 'src/components/show-error';
import Button from 'src/components/formElement/button';
import AddingStudent from './addingStudent';

import {
  getStudentList,
  deleteStudent,
  uploadStudentExcel,
  downloadStudentExcel
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

  const handleCloseModal = () => {
    setModal({ name: '' });
  };

  const handleUploadExcel = (e) => {
    var bodyFormData = new FormData();
    bodyFormData.append('file', e.target.files[0]);
    props.uploadStudentExcel(bodyFormData);
  };

  const handleDelete = ({ data }) => {
    const deletedStudentIds = data.map(
      (d) => props.studentListReducer.data.studentList[d.index].id
    );
    props.deleteStudent(deletedStudentIds);
  };

  const handleDownloadExcel = () => {
    props.downloadStudentExcel().then((res) => {
      fileDownload(res, 'ögrenci-listesi.xlsx');
    });
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
            <Button
              startIcon={<BackupIcon />}
              variant="outlined"
              component="label"
              text="Excel Yükle"
              className="mL5 mR5"
              loading={props.uploadStudentExcelReducer.fetching}
            >
              <Input
                type="file"
                sx={{ display: 'none' }}
                onChange={handleUploadExcel}
                inputProps={{ accept: '.xlsx , .xls' }}
              />
            </Button>
            <Button
              variant="outlined"
              startIcon={<CloudDownloadIcon />}
              text="EXCEL OLARAK İNDİR"
              onClick={handleDownloadExcel}
              loading={props.downloadStudentExcelReducer.fetching}
            />
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
  deleteStudentReducer: state.deleteStudentReducer,
  uploadStudentExcelReducer: state.uploadStudentExcelReducer,
  downloadStudentExcelReducer: state.downloadStudentExcelReducer
});

const mapDispatchToProps = {
  getStudentList,
  deleteStudent,
  uploadStudentExcel,
  downloadStudentExcel
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentList);
