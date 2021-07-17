import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

import './index.scss';

const Loading = () => {
  return (
    <Box className="loading-container">
      <Box>
        <CircularProgress size={60} />
      </Box>
    </Box>
  );
};

export default Loading;
