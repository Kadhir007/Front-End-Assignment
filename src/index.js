import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Posts from './Home/Posts';
import Comments from './Home/Comments';
import Navbar from './Navbar/Navbar';
import { Provider } from 'react-redux';
import store from './Reducers/store'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <div>
  <Navbar/>
  {/* <Posts/> */}
  </div>
  </Provider>
);

