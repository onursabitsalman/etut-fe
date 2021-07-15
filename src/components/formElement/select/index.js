import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { useField, useFormikContext } from 'formik';

const SelectWrapper = ({ name, options, ...rest }) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  const handleChange = (event) => {
    setFieldValue(name, event.target.value);
  };

  const configSelect = {
    variant: 'outlined',
    fullWidth: true,
    select: true,
    className: 'mB10',
    ...field,
    ...rest,
    onChange: handleChange
  };

  if (meta && meta.touched && meta.error) {
    configSelect.error = true;
    configSelect.helperText = meta.error;
  }

  return (
    <TextField {...configSelect}>
      {Object.keys(options).map((optionKey) => {
        return (
          <MenuItem key={optionKey} value={optionKey}>
            {options[optionKey]}
          </MenuItem>
        );
      })}
    </TextField>
  );
};

export default SelectWrapper;
