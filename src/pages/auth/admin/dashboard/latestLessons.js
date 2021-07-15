import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';

import lessons from 'src/__mocks__/lessons';

const LatestLessons = (props) => (
  <Card {...props}>
    <CardHeader title="Son Alınan Etütler" />
    <Divider />
    <PerfectScrollbar>
      <Box sx={{ minWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Öğrenci Adı</TableCell>
              <TableCell>Öğretmen Adı</TableCell>
              <TableCell>Başlangıç Saati</TableCell>
              <TableCell>Bitiş Saati</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lessons.map((lesson) => (
              <TableRow hover key={lesson.id}>
                <TableCell>{lesson.student.name}</TableCell>
                <TableCell>{lesson.teacher.name}</TableCell>
                <TableCell>
                  {moment(lesson.startTime).format('DD/MM/YYYY')}
                </TableCell>
                <TableCell>
                  {moment(lesson.endTime).format('DD/MM/YYYY')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </PerfectScrollbar>
  </Card>
);

export default LatestLessons;
