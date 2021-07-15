import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import MoneyIcon from '@material-ui/icons/Money';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import InsertChartIcon from '@material-ui/icons/InsertChartOutlined';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { red, green, orange, indigo } from '@material-ui/core/colors';

import { Helmet } from 'react-helmet';

import OverallInfoCard from 'src/components/overall-info-card';
import Sales from './sales';
import TrafficByDevice from './trafficByDevice';
import LatestOrders from './latestOrders';

const Dashboard = () => {
  const overallInfoCard = [
    {
      label: 'Budget',
      value: '$24.000',
      icon: <MoneyIcon />,
      iconBgColor: red[600],
      children: (
        <Box display="flex" alignItems="center">
          <ArrowDownwardIcon sx={{ color: red[900] }} />
          <Typography className="mR5" color={red[900]} variant="body2">
            12%
          </Typography>
          <Typography color="textSecondary" variant="caption">
            Since last month
          </Typography>
        </Box>
      )
    },
    {
      label: 'TOTAL CUSTOMERS',
      value: '1,600',
      icon: <PeopleIcon />,
      iconBgColor: green[600],
      children: (
        <Box display="flex" alignItems="center">
          <ArrowUpwardIcon sx={{ color: green[900] }} />
          <Typography className="mR5" color={green[900]} variant="body2">
            16%
          </Typography>
          <Typography color="textSecondary" variant="caption">
            Since last month
          </Typography>
        </Box>
      )
    },
    {
      label: 'TASKS PROGRESS',
      value: '75.5 % ',
      icon: <InsertChartIcon />,
      iconBgColor: orange[600],
      children: (
        <LinearProgress className="mT10" value={75.5} variant="determinate" />
      )
    },
    {
      label: 'TOTAL PROFIT',
      value: '$23,200 ',
      icon: <AttachMoneyIcon />,
      iconBgColor: indigo[600]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Dashboard | Material Kit</title>
      </Helmet>
      <Box minHeight="100%">
        <Grid container spacing={3}>
          {overallInfoCard.map((item) => {
            return (
              <Grid item xs={12} sm={6} lg={3} xl={3}>
                <OverallInfoCard {...item} />
              </Grid>
            );
          })}
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <Sales />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <TrafficByDevice sx={{ height: '100%' }} />
          </Grid>
          <Grid item lg={12} md={12} xl={9} xs={12}>
            <LatestOrders />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Dashboard;
