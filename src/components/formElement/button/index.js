import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useFormikContext } from 'formik';

const ButtonWrapper = (props) => {
  const { text, loading, partofform = false, onClick, ...rest } = props;

  const configButton = {
    variant: 'contained',
    fullWidth: true,
    color: 'primary',
    size: 'large',
    ...rest
  };

  if (partofform) {
    const { submitForm } = useFormikContext();
    const handleSubmit = () => {
      submitForm();
    };
    configButton.onClick = handleSubmit;
  } else {
    configButton.onClick = onClick;
  }

  return (
    <Button disabled={loading} {...configButton}>
      {loading && <CircularProgress size={20} />}
      {!loading && text}
    </Button>
  );
};

export default ButtonWrapper;
