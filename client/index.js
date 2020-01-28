import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './App.jsx';
import store from './store.js';
//must import create

import styles from './scss/application.scss';

//Basic stuff 
render(
  //Redux stuff
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));