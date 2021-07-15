import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

const IconButtonWithTooltip = (props) => {
  const { tooltipTitle, onClick, size = 'small', icon, disabled } = props;

  return (
    <Tooltip title={tooltipTitle}>
      <IconButton
        disabled={disabled}
        onClick={(e) => onClick && onClick(e)}
        size={size}
      >
        {icon}
      </IconButton>
    </Tooltip>
  );
};

export default IconButtonWithTooltip;
