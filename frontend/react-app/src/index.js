import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
//import * as serviceWorker from './serviceWorker';

import { combineReducers } from 'redux';
import {configureStore} from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import authReducer from './store/authReducer';
//import { localStorage } from 'redux-storage';

const reducer = combineReducers({ auth: authReducer }); // Using Combine Reducers here although only one reducer is present.
// Official explaination here: https://react-redux.js.org/using-react-redux/connect-mapstate#mapstatetoprops-will-not-run-if-the-store-state-is-the-same
const store = configureStore({reducer});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);

//checkout serviceWorker
//serviceWorker.unregister();
