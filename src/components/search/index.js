import { useState } from 'react';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';

import PropTypes from 'prop-types';

const Search = (props) => {
  const { type, onClickSearch } = props;
  const [searchState, setSearchState] = useState({
    userName: '',
    name: '',
    course: '',
    grade: '',
    phoneNumber: ''
  });

  const handleChangeTextField = (event) => {
    setSearchState({ ...searchState, [event.target.name]: event.target.value });
  };

  const { userName, name, course, grade, phoneNumber } = searchState;

  return (
    <Card className="mB10">
      <CardContent>
        <Grid container spacing={1}>
          <Grid item lg={3} md={3} xl={3} xs={12}>
            <TextField
              fullWidth
              size="small"
              placeholder="Kullanıcı Adı"
              variant="outlined"
              name="userName"
              value={userName}
              onChange={handleChangeTextField}
            />
          </Grid>
          <Grid item lg={3} md={3} xl={3} xs={12}>
            <TextField
              fullWidth
              size="small"
              placeholder="İsim"
              variant="outlined"
              name="name"
              value={name}
              onChange={handleChangeTextField}
            />
          </Grid>
          <Grid item lg={2} md={3} xl={3} xs={12}>
            <TextField
              fullWidth
              size="small"
              placeholder={type === 1 ? 'Ders' : 'Sınıf'}
              variant="outlined"
              name={type === 1 ? 'course' : 'class'}
              value={course || grade}
              onChange={handleChangeTextField}
            />
          </Grid>
          <Grid item lg={2} md={3} xl={3} xs={12}>
            <TextField
              fullWidth
              size="small"
              placeholder="Telefon Numarası"
              variant="outlined"
              name="phoneNumber"
              value={phoneNumber}
              onChange={handleChangeTextField}
            />
          </Grid>
          <Grid item lg={2} md={3} xl={3} xs={12}>
            <Button
              className="w100"
              height="100%"
              color="primary"
              variant="contained"
              endIcon={<SearchIcon />}
              onClick={() => onClickSearch(searchState)}
              disabled={!userName && !name && !course && !grade && !phoneNumber}
            >
              Ara
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

Search.propTypes = {
  onClickSearch: PropTypes.func,
  type: PropTypes.oneOf([1, 2]) /* 1: teacher , 2: student */
};

export default Search;
