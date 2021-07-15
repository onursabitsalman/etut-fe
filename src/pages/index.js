import React from 'react';
import { ThemeProvider } from '@material-ui/core';

import { useRoutes } from 'react-router-dom';

import routes from './routes';
import theme from '../assets/theme';

import 'src/assets/mixins/chartjs';
import 'react-perfect-scrollbar/dist/css/styles.css';

const App = () => {
  const routing = useRoutes(routes);
  return <ThemeProvider theme={theme}>{routing}</ThemeProvider>;
};

export default App;
