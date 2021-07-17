import Box from '@material-ui/core/Box';
import HighlightOffTwoToneIcon from '@material-ui/icons/HighlightOffTwoTone';
import Typography from '@material-ui/core/Typography';

const ShowError = (props) => {
  return (
    <Box
      className="pT40 pB40"
      display="flex"
      justifyContent="center"
      alignContent="center"
    >
      <Box display="flex" flexDirection="column">
        <HighlightOffTwoToneIcon sx={{ fontSize: '80px', margin: '0 auto' }} />
        <Typography component="div">
          <Box textAlign="center">{props.error}</Box>
        </Typography>
      </Box>
    </Box>
  );
};

export default ShowError;
