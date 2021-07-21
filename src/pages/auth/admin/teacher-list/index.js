import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import Box from '@material-ui/core/Box';
import MUIDataTable from 'mui-datatables';

import NoteAddIcon from '@material-ui/icons/NoteAdd';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

import Button from 'src/components/formElement/button';
import ShowError from 'src/components/show-error';
import Loading from 'src/components/loading';
import AddingTeacher from './addingTeacher';

import { getColumns } from './helper';

import {
  getTeacherList,
  deleteTeacher
} from 'src/globalstate/states/admin/teacher/action';

const modalEnums = {
  ADDING_TEACHER: 'ADDING_TEACHER'
};

/* TODO: ders listelerini getirecek api istenicek */

const TeacherList = (props) => {
  const [modal, setModal] = useState('');
  const [updatedTeacher, setUpdatedTeacher] = useState(null);

  useEffect(() => {
    props.getTeacherList();
  }, []);

  const handleClickIcon = (e, calledFunction, studentId) => {
    console.log('studentId: ', studentId);
    console.log('calledFunction: ', calledFunction);
    e.stopPropagation();
    setUpdatedTeacher(
      props.teacherListReducer.data.teacherList.find((s) => s.id === studentId)
    );
    if (calledFunction === '3') {
      setModal(modalEnums.ADDING_TEACHER);
    }
  };

  const handleAddTeacher = () => {
    setModal(modalEnums.ADDING_TEACHER);
  };

  const handleDeleteTeacher = ({ data }) => {
    const deletedTeacherIds = data.map(
      (d) => props.teacherListReducer.data.teacherList[d.index].id
    );
    props.deleteTeacher(deletedTeacherIds);
  };

  const handleCloseModal = () => {
    setModal('');
    setUpdatedTeacher(null);
  };

  return (
    <>
      <Helmet>
        <title>Teachers | Kurum Adı</title>
      </Helmet>
      {props.teacherListReducer.fetching || props.deleteTeacherReducer.fetching ? (
        <Loading />
      ) : props.teacherListReducer.error ? (
        <ShowError error={props.teacherListReducer.error} />
      ) : props.teacherListReducer.success ? (
        <Box>
          <Box className="mB10" display="flex">
            <Button
              text="Öğretmen Ekle"
              startIcon={<PersonAddIcon />}
              onClick={handleAddTeacher}
            />
            <Button
              className="mL5"
              color="primary"
              variant="outlined"
              startIcon={<NoteAddIcon />}
              text="Excel Yükle"
            />
          </Box>
          <MUIDataTable
            title="Öğretmen Listesi"
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
            <AddingTeacher
              open={true}
              onClickClose={handleCloseModal}
              teacher={updatedTeacher}
            />
          )}
        </Box>
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => ({
  teacherListReducer: state.teacherListReducer,
  deleteTeacherReducer: state.deleteTeacherReducer
});

const mapDispatchToProps = {
  getTeacherList,
  deleteTeacher
};

export default connect(mapStateToProps, mapDispatchToProps)(TeacherList);
