import { Box, Grid, LinearProgress } from '@material-ui/core';
import MoneyIcon from '@material-ui/icons/Money';
import InsertChartIcon from '@material-ui/icons/InsertChartOutlined';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import { green, red, orange, indigo } from '@material-ui/core/colors';

import { Helmet } from 'react-helmet';

import OverallInfoCard from 'src/components/overall-info-card';
import TrafficByDevice from './trafficByDevice';
import LatestLessons from './latestLessons';

const Dashboard = () => {
  const overallInfoCard = [
    {
      label: 'Öğretmen Sayısı',
      value: '41',
      icon: <MoneyIcon />,
      iconBgColor: red[600]
    },
    {
      label: 'ögrenci sayısı',
      value: '421',
      icon: <PeopleIcon />,
      iconBgColor: green[600]
    },
    {
      label: 'etüt doluluk oranı',
      value: '75.5 % ',
      icon: <InsertChartIcon />,
      iconBgColor: orange[600],
      children: <LinearProgress value={75.5} variant="determinate" />
    },
    {
      label: 'alınan toplam etüt',
      value: '41',
      icon: <AttachMoneyIcon />,
      iconBgColor: indigo[600]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Panel | Kurum Adı</title>
      </Helmet>
      <Box minHeight="100%">
        <Grid container spacing={3}>
          {overallInfoCard.map((item) => {
            return (
              <Grid key={item.label} item xs={12} sm={6} lg={3} xl={3}>
                <OverallInfoCard {...item} />
              </Grid>
            );
          })}
          <Grid item xs={12} md={12} lg={8} xl={9}>
            <LatestLessons />
          </Grid>
          <Grid item xs={12} md={6} lg={4} xl={3}>
            <TrafficByDevice sx={{ height: '100%' }} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Dashboard;
