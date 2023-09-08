import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Navbar from './Navbar/Navbar';
import { Provider } from 'react-redux';
import store from './Reducers/store'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
  <Provider store={store}>
  <Navbar/>
  </Provider>
  </>
);

