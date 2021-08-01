import React from 'react';
import Box from '@material-ui/core/Box';
import { green, red } from '@material-ui/core/colors';

import './index.scss';
import theme from 'src/assets/theme';

const TimeLabel = (props) => {
  return (
    <Box
      className="time-label-container"
      bgcolor={props.disabled ? green[400] : theme.palette.primary.main}
      onClick={() => props.onClick(props.date, props.disabled)}
    >
      {props.label}
    </Box>
  );
};

export default TimeLabel;
