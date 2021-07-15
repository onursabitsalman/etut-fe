import ReactDOM from 'react-dom';
import reduxPromise from 'redux-promise-middleware';
import thunk from 'redux-thunk';

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './pages/index';

import rootReducer from './globalstate/index';
import setupAxiosInterceptor from './config/axios';

import './assets/styles/index.scss';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(reduxPromise, thunk))
);

setupAxiosInterceptor();

window.addEventListener('unload', () => {
  localStorage.removeItem('access_token');
});

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
