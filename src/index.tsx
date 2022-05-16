import React from 'react';
import ReactDOM from 'react-dom/client';
// 导入antd样式文件
import 'antd/dist/antd.min.css';
import './index.scss';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

