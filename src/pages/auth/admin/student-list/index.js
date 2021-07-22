import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import fileDownload from 'js-file-download';
import MUIDataTable from 'mui-datatables';

import Input from '@material-ui/core/Input';
import Box from '@material-ui/core/Box';

import PersonAddIcon from '@material-ui/icons/PersonAdd';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import BackupIcon from '@material-ui/icons/Backup';

import CustomModal from 'src/components/custom-modal';
import Loading from 'src/components/loading';
import Title from 'src/components/title';
import ShowError from 'src/components/show-error';
import Button from 'src/components/formElement/button';
import AddingStudent from './addingStudent';

import Enums from 'src/libraries/enums';

import {
  getStudentList,
  deleteStudent,
  uploadStudentExcel,
  downloadStudentExcel
} from 'src/globalstate/states/admin/student/action';

import { getColumns } from './helper';

const modalEnums = {
  ADDING_STUDENT: 'ADDING_STUDENT',
  ERROR_DELETE_STUDENT: 'ERROR_DELETE_STUDENT',
  ERROR_UPLOAD_EXCEL: 'ERROR_UPLOAD_EXCEL',
  ERROR_DOWNLOAD_EXCEL: 'ERROR_DOWNLOAD_EXCEL'
};

const StudentList = (props) => {
  const [modal, setModal] = useState();
  const [updatedStudent, setUpdatedStudent] = useState(null);

  useEffect(() => {
    props.getStudentList();
  }, []);

  const handleClickIcon = (e, calledFunction, studentId) => {
    e.stopPropagation();
    setUpdatedStudent(
      props.studentListReducer.data.studentList.find((s) => s.id === studentId)
    );
    if (calledFunction === '2') {
      setModal(modalEnums.ADDING_STUDENT);
    }
  };

  const handleCloseModal = () => {
    setModal('');
    setUpdatedStudent(null);
  };

  const handleUploadExcel = (e) => {
    var bodyFormData = new FormData();
    bodyFormData.append('file', e.target.files[0]);
    props
      .uploadStudentExcel(bodyFormData)
      .then()
      .catch(() => {
        setModal(modalEnums.ERROR_UPLOAD_EXCEL);
      });
  };

  const handleDelete = ({ data }) => {
    const deletedStudentIds = data.map(
      (d) => props.studentListReducer.data.studentList[d.index].id
    );
    props
      .deleteStudent(deletedStudentIds)
      .then()
      .catch(() => {
        setModal(modalEnums.ERROR_DELETE_STUDENT);
      });
  };

  const handleDownloadExcel = () => {
    props
      .downloadStudentExcel()
      .then((response) => {
        fileDownload(response.data, 'ögrenci-listesi.xlsx');
      })
      .catch(() => {
        setModal(modalEnums.ERROR_DOWNLOAD_EXCEL);
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
              onClick={() => setModal(modalEnums.ADDING_STUDENT)}
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
              onRowsDelete: handleDelete,
              print: false,
              viewColumns: false,
              download: false
            }}
          />
          {modal === modalEnums.ADDING_STUDENT && (
            <AddingStudent onClickClose={handleCloseModal} student={updatedStudent} />
          )}
          {modal === modalEnums.ERROR_DELETE_STUDENT && (
            <CustomModal
              onClickClose={handleCloseModal}
              title="Öğrenci Silme"
              content={props.deleteStudentReducer.error}
            />
          )}
          {modal === modalEnums.ERROR_UPLOAD_EXCEL && (
            <CustomModal
              onClickClose={handleCloseModal}
              title="Excel Yükle"
              content={props.uploadStudentExcelReducer.error}
            />
          )}
          {modal === modalEnums.ERROR_DOWNLOAD_EXCEL && (
            <CustomModal
              onClickClose={handleCloseModal}
              title="Excel Olarak İndiR"
              content={props.downloadStudentExcelReducer.error}
            />
          )}
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
