import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ThemeProvider } from '@material-ui/core';

import useRoutes from './routes';
import theme from '../assets/theme';
import { setupAxiosInterceptor } from '../config/axios';

import 'src/assets/mixins/chartjs';
import 'react-perfect-scrollbar/dist/css/styles.css';

const App = (props) => {
  useEffect(() => {
    setupAxiosInterceptor();
  }, [props.loginReducer.success]);

  const routing = useRoutes();

  return <ThemeProvider theme={theme}>{routing}</ThemeProvider>;
};

const mapStateToProps = (state) => ({
  loginReducer: state.loginReducer
});

export default connect(mapStateToProps)(App);
