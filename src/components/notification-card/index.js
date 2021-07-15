import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import PropTypes from 'prop-types';

const NotificationCard = (props) => {
  const { title, subtitle, notifications, onChange, onClickSave } = props;

  return (
    <Card>
      <CardHeader subheader={subtitle} title={title} />
      <Divider />
      <CardContent>
        <Grid container spacing={1} wrap="wrap">
          {notifications.map((item) => {
            return (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                display="flex"
                flexDirection="column"
                key={item.header}
              >
                <Typography color="textPrimary" gutterBottom variant="h6">
                  {item.header}
                </Typography>

                {item.options.map((option) => {
                  return (
                    <FormControlLabel
                      key={option.name}
                      control={
                        <Checkbox
                          color="primary"
                          checked={option.isChecked}
                          name={option.name}
                          onChange={onChange}
                        />
                      }
                      label={option.label}
                    />
                  );
                })}
              </Grid>
            );
          })}
        </Grid>
      </CardContent>
      <Divider />
      <Box className="p10" display="flex" justifyContent="flex-end">
        <Button color="primary" variant="contained" onClick={onClickSave}>
          Save
        </Button>
      </Box>
    </Card>
  );
};

NotificationCard.defaultProps = {
  title: 'Notifications',
  subtitle: 'Manage Notifications'
};

NotificationCard.propTypes = {
  notifications: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string
};

export default NotificationCard;
