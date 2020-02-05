import React from 'react';
import ReactDOM from 'react-dom';
// import { ConfigProvider, DatePicker, message } from 'antd';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';
import './index.css';
import App from './App';
import  {Provider}  from 'react-redux';
import store from './confing/redux/store';


import * as serviceWorker from './serviceWorker';



ReactDOM.render(


    <Provider store={store}>
    <App />
    </Provider>,
     document.getElementById('root'));


serviceWorker.unregister();
