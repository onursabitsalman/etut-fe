import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';

const OverallInfoCard = (props) => {
  const { label, value, icon, iconBgColor, children } = props;

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Grid container sx={{ justifyContent: 'space-between' }}>
          <Grid item>
            <Typography variant="h6">{label.toUpperCase('tr-TR')}</Typography>
            <Typography variant="h3">{value}</Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{ height: 56, width: 56, backgroundColor: iconBgColor }}
            >
              {icon}
            </Avatar>
          </Grid>
        </Grid>
        <Box className="pT10 ">{children}</Box>
      </CardContent>
    </Card>
  );
};

export default OverallInfoCard;
