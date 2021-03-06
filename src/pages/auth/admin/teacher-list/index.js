import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import fileDownload from 'js-file-download';
import MUIDataTable from 'mui-datatables';
import { useLocation, useHistory } from 'react-router-dom';

import Box from '@material-ui/core/Box';
import Input from '@material-ui/core/Input';

import PersonAddIcon from '@material-ui/icons/PersonAdd';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import BackupIcon from '@material-ui/icons/Backup';

import Button from 'src/components/formElement/button';
import ShowError from 'src/components/show-error';
import Loading from 'src/components/loading';
import AddingTeacher from './addingTeacher';
import CustomModal from 'src/components/custom-modal';

import Enums from 'src/libraries/enums';

import { getColumns } from './helper';

import {
  getTeacherList,
  deleteTeacher,
  uploadTeacherExcel,
  downloadTeacherExcel
} from 'src/globalstate/states/admin/teacher/action';

const modalEnums = {
  ADDING_TEACHER: 'ADDING_TEACHER',
  ERROR_DELETE_TEACHER: 'ERROR_DELETE_TEACHER',
  ERROR_DOWNLOAD_EXCEL: 'ERROR_DOWNLOAD_EXCEL',
  ERROR_UPLOAD_EXCEL: 'ERROR_UPLOAD_EXCEL'
};

/* TODO: ders listelerini getirecek api istenicek */

const TeacherList = (props) => {
  const [modal, setModal] = useState('');
  const [updatedTeacher, setUpdatedTeacher] = useState(null);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    props.getTeacherList();
  }, []);

  const handleClickIcon = (e, calledFunction, teacherId) => {
    e.stopPropagation();
    setUpdatedTeacher(
      props.teacherListReducer.data.teacherList.find((s) => s.id === teacherId)
    );
    if (calledFunction === '3') {
      setModal(modalEnums.ADDING_TEACHER);
    } else if (calledFunction == '1') {
      history.replace(`${location.pathname}/set-course/${teacherId}`);
    }
  };

  const handleAddTeacher = () => {
    setModal(modalEnums.ADDING_TEACHER);
  };

  const handleDeleteTeacher = ({ data }) => {
    const deletedTeacherIds = data.map(
      (d) => props.teacherListReducer.data.teacherList[d.index].id
    );
    props
      .deleteTeacher(deletedTeacherIds)
      .then()
      .catch(() => {
        setModal(modalEnums.ERROR_DELETE_TEACHER);
      });
  };

  const handleDownloadExcel = () => {
    props
      .downloadTeacherExcel()
      .then((response) => {
        fileDownload(response.data, '????retmen-listesi.xlsx');
      })
      .catch(() => {
        setModal(modalEnums.ERROR_DOWNLOAD_EXCEL);
      });
  };

  const handleUploadExcel = (e) => {
    const bodyFormData = new FormData();
    bodyFormData.append('file', e.target.files[0]);
    props
      .uploadTeacherExcel(bodyFormData)
      .then()
      .catch(() => {
        setModal(modalEnums.ERROR_UPLOAD_EXCEL);
      });
  };

  const handleCloseModal = () => {
    setModal('');
    setUpdatedTeacher(null);
  };

  return (
    <>
      <Helmet>
        <title>Teachers | Kurum Ad??</title>
      </Helmet>
      {props.teacherListReducer.fetching || props.deleteTeacherReducer.fetching ? (
        <Loading />
      ) : props.teacherListReducer.error ? (
        <ShowError error={props.teacherListReducer.error} />
      ) : props.teacherListReducer.success ? (
        <Box>
          <Box className="mB10" display="flex">
            <Button
              text="????retmen Ekle"
              startIcon={<PersonAddIcon />}
              onClick={handleAddTeacher}
            />
            <Button
              startIcon={<BackupIcon />}
              variant="outlined"
              component="label"
              text="Excel Y??kle"
              className="mL5 mR5"
              loading={props.uploadTeacherExcelReducer.fetching}
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
              text="EXCEL OLARAK ??ND??R"
              onClick={handleDownloadExcel}
              loading={props.downloadTeacherExcelReducer.fetching}
            />
          </Box>
          <MUIDataTable
            title="????retmen Listesi"
            data={props.teacherListReducer.data.teacherList}
            columns={getColumns(handleClickIcon)}
            options={{
              onRowsDelete: handleDeleteTeacher,
              print: false,
              viewColumns: false,
              download: false
            }}
          />
          {modal === modalEnums.ADDING_TEACHER && (
            <AddingTeacher onClickClose={handleCloseModal} teacher={updatedTeacher} />
          )}
          {modal === modalEnums.ERROR_DELETE_TEACHER && (
            <CustomModal
              onClickClose={handleCloseModal}
              title="????retmen Silme"
              content={props.deleteTeacherReducer.error}
            />
          )}
          {modal === modalEnums.ERROR_DOWNLOAD_EXCEL && (
            <CustomModal
              onClickClose={handleCloseModal}
              title="Excel Olarak ??ndir"
              content={props.downloadTeacherExcelReducer.error}
            />
          )}
          {modal === modalEnums.ERROR_UPLOAD_EXCEL && (
            <CustomModal
              onClickClose={handleCloseModal}
              title="Excel Y??kle"
              content={props.uploadTeacherExcelReducer.error}
            />
          )}
        </Box>
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => ({
  teacherListReducer: state.teacherListReducer,
  deleteTeacherReducer: state.deleteTeacherReducer,
  downloadTeacherExcelReducer: state.downloadTeacherExcelReducer,
  uploadTeacherExcelReducer: state.uploadTeacherExcelReducer
});

const mapDispatchToProps = {
  getTeacherList,
  deleteTeacher,
  downloadTeacherExcel,
  uploadTeacherExcel
};

export default connect(mapStateToProps, mapDispatchToProps)(TeacherList);
