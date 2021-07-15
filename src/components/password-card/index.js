import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';

const PasswordCard = (props) => {
  const { subtitle, title, onChange, onClickUpdate, values } = props;

  return (
    <Card>
      <CardHeader subheader={subtitle} title={title} />
      <Divider />
      <CardContent>
        <TextField
          fullWidth
          label="Password"
          name="password"
          onChange={onChange}
          type="password"
          value={values.password}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Confirm password"
          name="confirm"
          onChange={onChange}
          type="password"
          value={values.confirm}
        />
      </CardContent>
      <Divider />
      <Box className="p10" display="flex" justifyContent="flex-end">
        <Button color="primary" variant="contained" onClick={onClickUpdate}>
          Update
        </Button>
      </Box>
    </Card>
  );
};

PasswordCard.defaultProps = {
  title: 'Password',
  subtitle: 'Update password'
};

export default PasswordCard;
