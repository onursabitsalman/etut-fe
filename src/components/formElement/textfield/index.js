import React from 'react';
import TextField from '@material-ui/core/TextField';
import { useField } from 'formik';

const TextFieldWrapper = ({ name, ...rest }) => {
  const [field, meta] = useField(name);

  const configTextField = {
    variant: 'outlined',
    fullWidth: true,
    className: 'mB10',
    autoComplete: 'off',
    ...field,
    ...rest
  };

  if (meta && meta.touched && meta.error) {
    configTextField.error = true;
    configTextField.helperText = meta.error;
  }

  return <TextField {...configTextField} />;
};

export default TextFieldWrapper;
