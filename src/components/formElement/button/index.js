import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useFormikContext } from 'formik';

const ButtonWrapper = (props) => {
  const { text, loading, children, partofform = false, onClick, ...rest } = props;

  const configButton = {
    variant: 'contained',
    color: 'primary',
    size: 'medium',
    ...rest
  };

  const { submitForm } = useFormikContext() || {};
  if (partofform) {
    configButton.onClick = () => submitForm();
  } else {
    configButton.onClick = onClick;
  }

  return (
    <Button disabled={loading} {...configButton}>
      {loading && <CircularProgress size={20} />}
      {!loading && text}
      {!loading && children}
    </Button>
  );
};

export default ButtonWrapper;
