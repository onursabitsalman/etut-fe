import { Helmet } from 'react-helmet';
import { Box, Button } from '@material-ui/core';

import MUIDataTable from 'mui-datatables';

import NoteAddIcon from '@material-ui/icons/NoteAdd';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import DeleteIcon from '@material-ui/icons/Delete';

import teachers from 'src/__mocks__/teachers';
import { getColumns } from './helper';

const TeacherList = () => {
  const handleClickIcon = (e) => {
    e.stopPropagation();
    console.log('handle-click-icons');
  };

  return (
    <>
      <Helmet>
        <title>Teachers | Kurum Adı</title>
      </Helmet>
      <Box>
        <Box className="mB10" display="flex">
          <Button
            sx={{ mx: 1 }}
            color="primary"
            variant="contained"
            startIcon={<PersonAddIcon />}
          >
            Öğretmen Ekle
          </Button>
          <Button
            sx={{ mx: 1 }}
            color="primary"
            variant="outlined"
            startIcon={<NoteAddIcon />}
          >
            Excel Yükle
          </Button>
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
          title="Öğretmen Listesi"
          data={teachers}
          columns={getColumns(handleClickIcon)}
          options={{
            onRowClick: (e) => console.log('haydar', e),
            print: false,
            viewColumns: false,
            download: false
          }}
        />
      </Box>
    </>
  );
};

export default TeacherList;
